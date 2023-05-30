package com.pingo;
import android.os.Bundle; 
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import org.devio.rn.splashscreen.SplashScreen;

import android.os.Build;
import android.provider.Settings;
import android.content.Intent;
import android.net.Uri;



public class MainActivity extends ReactActivity {
  private static final int REQUEST_CODE = 123; // added by me

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "pingo";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        // Enter the below code to checked is application has a permission of display on other app or not
//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
//     Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
//             Uri.parse("package:" + getPackageName()));
//     startActivityForResult(intent, REQUEST_CODE);
// }

    }
    
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
  // This code checks if the user has granted the permission. If the permission is granted, you can perform the actions that require it.
//   @Override
// public void onActivityResult(int requestCode, int resultCode, Intent data) {
//     if (requestCode == REQUEST_CODE) {
//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && Settings.canDrawOverlays(this)) {
//             // Permission granted
//         } else {
//             // Permission denied
//         }
//     }
// }

}
