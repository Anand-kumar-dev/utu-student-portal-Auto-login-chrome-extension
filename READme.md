# Website Watcher & Enroller

## Overview

Website Watcher & Enroller is a Chrome extension designed to automate the login process for the UTU (Uka Tarsadia University) student portal. The extension securely stores user credentials and automatically logs users into the portal when they visit the specified URL.

## Features

- **Secure Credential Storage**: Safely stores enrollment number and password in the browser's local storage.
- **Automatic Login**: Automatically logs in to the UTU student portal using stored credentials.
- **Cookie Management**: Sets necessary cookies for authentication and removes them after a specified time period.
- **User-Friendly Interface**: Clean, modern UI for entering and saving credentials.
- **Session Management**: Handles browser session to maintain login state appropriately.

## Technical Architecture

### Components

1. **Popup Interface (`index.html`, `popup.js`, `styles.css`)**
   - Provides a user interface for entering and saving credentials
   - Validates user input and displays appropriate feedback
   - Stores credentials in Chrome's local storage

2. **Background Script (`background.js`)**
   - Handles communication with the external authentication API    ("autologin.duckdns.org")
   - Manages cookie setting and removal
   - Implements alarm functionality to remove cookies after a set time

3. **Content Script (`content.js`)**
   - Executes on the target website (UTU student portal)
   - Checks for stored credentials and initiates login process
   - Manages page reloading after successful login

4. **Manifest (`manifest.json`)**
   - Defines extension permissions and behavior
   - Specifies content script matching patterns
   - Declares service worker and host permissions

### Workflow

1. User enters enrollment number and password in the extension popup
2. Credentials are validated and stored in Chrome's local storage
3. When the user visits the UTU student portal, the content script checks for stored credentials
4. If credentials exist and the user is not already logged in, the content script sends a message to the background script
5. The background script makes an API call to the authentication server with the credentials
6. Upon successful authentication, the background script sets the necessary cookies
7. The page is reloaded, and the user is automatically logged in
8. Cookies are automatically removed after 3 minutes to maintain security

## Security Considerations

- Credentials are stored locally in the browser and are not transmitted except to the specified authentication API
- Cookies are automatically removed after a short period to prevent unauthorized access
- The extension only operates on the specified domain (app.utu.ac.in)
- API communication is secured using HTTPS

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory
5. The extension should now appear in your browser toolbar

## Usage

1. Click on the extension icon in the Chrome toolbar
2. Enter your enrollment number and password
3. Click "Save Credentials"
4. Navigate to the UTU student portal (https://app.utu.ac.in/stud/)
5. The extension will automatically log you in

## Development

### Prerequisites

- Chrome browser
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of Chrome extension architecture

### Modifying the Extension

- Edit `manifest.json` to change permissions or content script matching patterns
- Modify `popup.js` and `index.html` to change the user interface
- Update `background.js` to alter API communication or cookie management
- Adjust `content.js` to change how the extension interacts with the target website

## Troubleshooting

- If login fails, check that your credentials are correct
- Ensure that the extension has the necessary permissions
- Check the browser console for error messages
- Verify that the authentication API is accessible

## Future Enhancements

- Add support for multi-factor authentication
- Implement credential encryption for additional security
- Add option to automatically clear credentials after a specified time
- Support for additional university portals



## Disclaimer

This extension is not officially affiliated with Uka Tarsadia University. It is a third-party tool created to enhance the user experience of the university's student portal.