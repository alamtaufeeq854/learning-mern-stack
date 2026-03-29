function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ name: "ChaiCode", url: "https://www.google.com/" });
    }, 3000);
  });
}

async function getUserData() {
  try {
    console.log("Fetching user data...");
    const userData = await fetchUserData();
    console.log("User data fetched Successfully ");

    console.log("User data: ", userData);
  } catch (error) {
    console.log("Error Fetching Data", error);
  }
}

getUserData();
