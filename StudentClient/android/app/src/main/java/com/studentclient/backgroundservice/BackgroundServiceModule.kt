package com.yourappname.backgroundservice

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BackgroundServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BackgroundService"
    }

    @ReactMethod
    fun startService() {
        // Implement background service logic here
    }

    @ReactMethod
    fun stopService() {
        // Implement background service cleanup logic here
    }
}
