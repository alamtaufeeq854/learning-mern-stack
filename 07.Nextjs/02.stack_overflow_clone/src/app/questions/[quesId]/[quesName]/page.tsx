import Answers from "@/components/Answers";
import Comments from "@/components/Comments";
import { MarkdownPreview } from "@/components/RTE";
import VoteButtons from "@/components/VoteButtons";
import Particles from "@/components/magicui/particles";
import ShimmerButton from "@/components/magicui/shimmer-button";

import { avatars } from "@/models/client/config";

import {
  answerCollection,
  db,
  voteCollection,
  questionCollection,
  commentCollection,
  questionAttachmentBucket,
} from "@/models/name";

import { databases, users } from "@/models/server/config";
import { storage } from "@/models/client/config";

import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import slugify from "@/utils/slugify";

import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";

import DeleteQuestion from "./DeleteQuestion";
import EditQuestion from "./EditQuestion";

import { TracingBeam } from "@/components/ui/tracing-beam";

const Page = async ({
  params,
}: {
  params: {
    quesId: string;
    quesName: string;
  };
}) => {
  // DEBUG: Check whether question ID is coming from URL
  console.log("PARAMS:", params);
  console.log("QUESTION ID:", params.quesId);
  console.log("QUESTION NAME:", params.quesName);

  const [question, answers, upvotes, downvotes, comments] = await Promise.all([
    // Get Question
    databases.getDocument(db, questionCollection, params.quesId),

    // Get Answers
    databases.listDocuments(db, answerCollection, [
      Query.orderDesc("$createdAt"),
      Query.equal("questionId", params.quesId),
    ]),

    // Get Upvotes
    databases.listDocuments(db, voteCollection, [
      Query.equal("typeId", params.quesId),
      Query.equal("type", "question"),
      Query.equal("voteStatus", "upvoted"),
      Query.limit(1),
    ]),

    // Get Downvotes
    databases.listDocuments(db, voteCollection, [
      Query.equal("typeId", params.quesId),
      Query.equal("type", "question"),
      Query.equal("voteStatus", "downvoted"),
      Query.limit(1),
    ]),

    // Get Comments
    databases.listDocuments(db, commentCollection, [
      Query.equal("type", "question"),
      Query.equal("typeId", params.quesId),
      Query.orderDesc("$createdAt"),
    ]),
  ]);

  // Get question author
  const author = await users.get<UserPrefs>(question.authorId);

  // Process comments and answers
  [comments.documents, answers.documents] = await Promise.all([
    // Comments
    Promise.all(
      comments.documents.map(async (comment) => {
        const author = await users.get<UserPrefs>(comment.authorId);

        return {
          ...comment,
          author: {
            $id: author.$id,
            name: author.name,
            reputation: author.prefs.reputation,
          },
        };
      }),
    ),

    // Answers
    Promise.all(
      answers.documents.map(async (answer) => {
        const [author, comments, upvotes, downvotes] = await Promise.all([
          users.get<UserPrefs>(answer.authorId),

          databases.listDocuments(db, commentCollection, [
            Query.equal("typeId", answer.$id),
            Query.equal("type", "answer"),
            Query.orderDesc("$createdAt"),
          ]),

          databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", answer.$id),
            Query.equal("type", "answer"),
            Query.equal("voteStatus", "upvoted"),
            Query.limit(1),
          ]),

          databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", answer.$id),
            Query.equal("type", "answer"),
            Query.equal("voteStatus", "downvoted"),
            Query.limit(1),
          ]),
        ]);

        comments.documents = await Promise.all(
          comments.documents.map(async (comment) => {
            const author = await users.get<UserPrefs>(comment.authorId);

            return {
              ...comment,
              author: {
                $id: author.$id,
                name: author.name,
                reputation: author.prefs.reputation,
              },
            };
          }),
        );

        return {
          ...answer,
          comments,
          upvotesDocuments: upvotes,
          downvotesDocuments: downvotes,
          author: {
            $id: author.$id,
            name: author.name,
            reputation: author.prefs.reputation,
          },
        };
      }),
    ),
  ]);

  return (
    <TracingBeam className="container pl-6">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />

      <div className="relative mx-auto px-4 pb-20 pt-36">
        {/* HEADER */}
        <div className="flex">
          <div className="w-full">
            <h1 className="mb-1 text-3xl font-bold">{question.title}</h1>

            <div className="flex gap-4 text-sm">
              <span>
                Asked {convertDateToRelativeTime(new Date(question.$createdAt))}
              </span>

              <span>Answer {answers.total}</span>

              <span>Votes {upvotes.total + downvotes.total}</span>
            </div>
          </div>

          {/* ASK QUESTION */}
          <Link href="/questions/ask" className="ml-auto inline-block shrink-0">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Ask a question
              </span>
            </ShimmerButton>
          </Link>
        </div>

        <hr className="my-4 border-white/40" />

        <div className="flex gap-4">
          {/* VOTE / EDIT / DELETE */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <VoteButtons
              type="question"
              id={question.$id}
              className="w-full"
              upvotes={upvotes}
              downvotes={downvotes}
            />

            <EditQuestion
              questionId={question.$id}
              questionTitle={question.title}
              authorId={question.authorId}
            />

            <DeleteQuestion
              questionId={question.$id}
              authorId={question.authorId}
            />
          </div>

          {/* QUESTION CONTENT */}
          <div className="w-full overflow-auto">
            <MarkdownPreview
              className="rounded-xl p-4"
              source={question.content}
            />

            {/* ATTACHMENT */}
            {question.attachmentId && (
              <picture>
                <img
                  src={
                    storage.getFilePreview(
                      questionAttachmentBucket,
                      question.attachmentId,
                    ).href
                  }
                  alt={question.title}
                  className="mt-3 rounded-lg"
                />
              </picture>
            )}

            {/* TAGS */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              {question.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/questions?tag=${tag}`}
                  className="inline-block rounded-lg bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20">
                  #{tag}
                </Link>
              ))}
            </div>

            {/* AUTHOR */}
            <div className="mt-4 flex items-center justify-end gap-1">
              <picture>
                <img
                  src={avatars.getInitials(author.name, 36, 36).href}
                  alt={author.name}
                  className="rounded-lg"
                />
              </picture>

              <div className="block leading-tight">
                <Link
                  href={`/users/${author.$id}/${slugify(author.name)}`}
                  className="text-orange-500 hover:text-orange-600">
                  {author.name}
                </Link>

                <p>
                  <strong>{author.prefs.reputation}</strong>
                </p>
              </div>
            </div>

            {/* COMMENTS */}
            <Comments
              comments={comments}
              className="mt-4"
              type="question"
              typeId={question.$id}
            />

            <hr className="my-4 border-white/40" />
          </div>
        </div>

        {/* ANSWERS */}
        <Answers answers={answers} questionId={question.$id} />
      </div>
    </TracingBeam>
  );
};

export default Page;
