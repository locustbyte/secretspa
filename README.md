# secretspa test

1. Clone the project
    $ git clone https://github.com/locustbyte/secretspa.git

2. Ensure you have the latest Ionic installed 
    $ npm install -g ionic

3. Install Android SDK for deploying to phone
    https://stackoverflow.com/questions/2677431/where-to-install-android-sdk-on-mac-os-x
    https://developer.android.com/studio
    
4. Connect Android phone via USB
    This phone should be developer enabled: https://www.digitaltrends.com/mobile/how-to-get-developer-options-on-android/
    And should have USB debuggin enabled
    
5.  From within project root run
    $ ionic cordova run android --device
    
This should run a build and deploy to the connected Android phone.

