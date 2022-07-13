# ESMP WHIP

## Installation
### Basic
#### Install Node JS. 
Recommended: Version >= 6
#### Install React Native cli: 

```sh
npm install -g react-native-cli
```

#### Clone sourcecode:

```sh
git clone [git-url]
```

#### Install node modules:

```sh
npm i
```

#### Link modules:

```sh
npm run link
```
  
### For IOS:

#### Install podfile:

```sh
cd ios && pod install && cd ..
```

#### Setup OneSignal
- Open main project in xcode and Select your main project in the navigator to bring up settings
- Under `Build Settings` scroll down to `Search Paths`
- Add new path for OneSignal to your `Header Search Paths` or make sure it's the same with below path if it already exists:

```sh
$(SRCROOT)/../node_modules/react-native-onesignal/ios
```

and choose `Recursive`

#### Setup Facebook Login:
- Open xcode project: ```open ios/espmWhip.xcworkspace/```
- Run ```open node_modules/react-native-facebook-login```
- Have your react native xcode project open and drag `RCTFBLogin.xcodeproj` into your `Libraries` group.
- Select your main project in the navigator to bring up settings
- Under `Build Phases` expand the `Link Binary With Libraries` header. Do these steps if you don't see libRCTFBLogin.a on the list
+ Scroll down and click the `+` to add a library
+ Find and add `libRCTFBLogin.a` under the `Workspace` group

#### Add Facebook SDK
- Run `open node_modules/react-native-facebook-login/FacebookSDK`
- Open your main project in xcode and right click on your project’s name in the left sidebar and select “New Group” and type in “Frameworks”. **Do not do this if you already install pod**
- Select all the `.framework` files in the FacebookSDK folder in react-native-facebook-login node module and click drag them into the Frameworks folder/group you just created in xcode or highlight the Frameworks group in left sidebar and go to File > Add files to "yourProjectName" and select the `.framework` files.
- Select your main project in the navigator to bring up settings
- Under `Build Settings` scroll down to `Search Paths`
- Add the following path to your `Framework Search Paths`

```sh
$(SRCROOT)/../node_modules/react-native-facebook-login/FacebookSDK
```

then choose `Recursive`
- ⌘ + B to build

## Build

### Android:
- Run

```sh
npm run android
```

- If you have problem during building, run this:

```sh
cd android && ./gradlew clean && cd ..
```

then Rebuild it

### IOS:

- Run:

```sh
react-native run-ios
```