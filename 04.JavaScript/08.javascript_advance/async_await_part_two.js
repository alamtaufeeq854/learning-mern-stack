function fetchPostData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Post Data Fetched");
    }, 3000);
  });
}

function fetchCommentData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Comment data fetched");
    }, 2000);
  });
}

async function getBlogData() {
  try {
    console.log("Fetching Blog Data");
    // const blogData = await fetchPostData();
    // const commentData = await fetchCommentData();

    const [blogData, commentData] = await Promise.all([
      fetchPostData(),
      fetchCommentData(),
    ]);
    console.log(blogData);
    console.log(commentData);
    console.log("Fetch Complete");
  } catch (error) {
    console.error("Error Fetching Blog Data", error);
  }
}

getBlogData();
