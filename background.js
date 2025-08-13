

function setCookies(cookies) {
    if (!cookies || !Array.isArray(cookies)) {
        console.error("setCookies received invalid data:", cookies);
        return;
    }
    cookies.forEach(cookie => {
        const cookieUrl = `https://${cookie.domain.replace(/^\./, '')}${cookie.path}`;
        const cookieDetails = {
            url: cookieUrl,
            name: cookie.name,
            value: cookie.value,
            domain: cookie.domain,
            path: cookie.path,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite ? cookie.sameSite.toLowerCase() : 'lax'
        };

        if (cookie.expires && cookie.expires > 0) {
            cookieDetails.expirationDate = cookie.expires;
        }

        chrome.cookies.set(cookieDetails, (setCookie) => {
            if (chrome.runtime.lastError) {
                console.error(`Error setting cookie "${cookie.name}" for URL "${cookieUrl}":`, chrome.runtime.lastError);
            } else {
                console.log('Cookie set successfully:', setCookie);
            }
        });
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'login') {
        const credentials = message.infor;
        fetch('https://autologin.duckdns.org', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Enrollment: credentials.Enrollment,
                Password: credentials.Password
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                setCookies(data);
                chrome.storage.local.set({ cookieSet: true });
                chrome.alarms.create('removeCookieAlarm', { delayInMinutes: 3 });
                sendResponse({ success: true, message: 'cookies set' });
            } else {
                throw new Error("API did not return a valid cookie array.");
            }
        })
        .catch(error => {
            console.error('Error in login process:', error);
            sendResponse({ success: false, error: error.message });
        });
        return true; 
    }
    
    if (message.action === "createRemoveCookieAlarm") {
        chrome.alarms.create('removeCookieAlarm', { delayInMinutes: 3 });
        sendResponse({ success: true, message: "Alarm created." });
    }
});


chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'removeCookieAlarm') {
        chrome.storage.local.remove('cookieSet', () => {
            console.log('cookieSet flag removed by alarm after 3 minutes.');
        });
    }
});