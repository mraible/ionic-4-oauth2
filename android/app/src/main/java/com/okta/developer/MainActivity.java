package com.okta.developer;

import android.os.Bundle;

import com.byteowls.capacitor.oauth2.OAuth2ClientPlugin;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    List<Class<? extends Plugin>> additionalPlugins = new ArrayList<>();
    additionalPlugins.add(OAuth2ClientPlugin.class);

    // Initializes the Bridge
    this.init(savedInstanceState, additionalPlugins);
  }
}
