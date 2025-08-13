# Website Watcher & Enroller


## Backend System

The extension is powered by a sophisticated backend system hosted at autologin.duckdns.org that handles the actual authentication process. This backend system utilizes several key technologies:

- **Express.js**: Provides the web server framework for handling API requests from the extension
- **Playwright**: Enables browser automation to navigate the university portal login process
- **Google Vision OCR**: Used for automatically solving CAPTCHA challenges that appear during the login process

The backend system works by receiving the user credentials from the extension, automating the login process on the university portal, solving any CAPTCHA challenges using OCR technology, and then returning the authentication cookies to the extension for seamless user experience.


## Overview

Website Watcher & Enroller is a Chrome extension designed to automate the login process for the UTU (Uka Tarsadia University) student portal. The extension securely stores user credentials and automatically logs users into the portal when they visit the specified URL.

## Features

- **Secure Credential Storage**: Safely stores enrollment number and password in the browser's local storage.
- **Automatic Login**: Automatically logs in to the UTU student portal using stored credentials.
- **Cookie Management**: Sets necessary cookies for authentication and removes them after a specified time period.
- **User-Friendly Interface**: Clean, modern UI for entering and saving credentials.
- **Session Management**: Handles browser session to maintain login state appropriately.
- **CAPTCHA Solving**: Utilizes Google Vision OCR technology to automatically solve CAPTCHA challenges.
