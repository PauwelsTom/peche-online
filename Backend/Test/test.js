const BASE_URL = "http://localhost:3001";
let token = "";

function printResponse(test, res) {
    console.log("--------------------\n\nTEST NAME:", test, "\n\nResponse:\n" + res + "\n\n--------------------");
}

async function fetchAndPrintJson(url, options, testName) {
    try {
        const response = await fetch(url, options);
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            if (testName === "Login" && data.token) {
                token = data.token;
            }

            printResponse(testName, JSON.stringify(data, null, 2));
        } else {
            const text = await response.text();
            console.error(`❌ ${testName} returned non-JSON:\n${text}`);
        }
    } catch (error) {
        console.error(`🔥 Error in ${testName}:`, error.message);
    }
}

async function testRegister() {
    console.log("Test /register");
    await fetchAndPrintJson(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "admin" }),
    }, "Register");
}

async function testLogin() {
    console.log("Test /login");
    await fetchAndPrintJson(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "admin" }),
    }, "Login");
}

async function testNewPoisson() {
    console.log("Test /newPoisson");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    await fetchAndPrintJson(`${BASE_URL}/newPoisson`, {
        method: "POST",
        headers,
        body: JSON.stringify({}),
    }, "New Poisson");
}

async function testTest() {
    console.log("Test /test");
    await fetchAndPrintJson(`${BASE_URL}/test`, null, "Test");
}

async function runTests() {
    await testTest();
    await testRegister();
    await testLogin();
    await testNewPoisson();
}

runTests().catch(err => console.error(err));
