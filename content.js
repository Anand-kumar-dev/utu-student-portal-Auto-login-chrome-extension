// content.js

(async () => {
    const data = await chrome.storage.local.get(["cookieSet", "Enrollment", "Password"]);

    if (data.cookieSet) {
        console.log('Content: Already logged in for this session.');
        return;
    }

    if (!data.Enrollment || !data.Password) {
        console.log("Content: Credentials not found in storage.");
        return;
    }

    console.log("Content: Requesting login from background script...");
    chrome.runtime.sendMessage({ action: 'login', infor: { Enrollment: data.Enrollment, Password: data.Password } }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Content: Error communicating with background.", chrome.runtime.lastError.message);
            return;
        }

        if (response && response.success) {
            console.log("Content: Login successful. Reloading page...");
            sessionStorage.setItem("isReloadingAfterLogin", "true");
            location.reload();
        } else {
            console.error("Content: Background script reported a failure.", response ? response.error : "No response");
        }
    });
})();


window.addEventListener('beforeunload', async () => {
    if (sessionStorage.getItem("isReloadingAfterLogin")) {
        await sessionStorage.removeItem("isReloadingAfterLogin");
    } else {
        chrome.storage.local.remove("cookieSet");
    }
});











