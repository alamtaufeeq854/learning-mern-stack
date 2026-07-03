// import React from 'react'

function Card() {
  return (
    <div>
      <div class="flex flex-col items-center gap-6 p-7 md:flex-row rounded-2xl">
        <div>
          <img
            class="size-48 shadow-xl rounded-md"
            alt=""
            src="https://tse2.mm.bing.net/th/id/OIP.nvlbY6PzDcr8yukS82T5egHaHa?pid=Api&h=220&P=0"
          />
        </div>
        <div class="flex items-center md:items-start">
          <span class="text-2xl font-medium">The Black Cat</span>
          <span class="font-medium text-sky-500"></span>
          <span class="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
            <span></span>
            <span>·</span>
            <span></span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
