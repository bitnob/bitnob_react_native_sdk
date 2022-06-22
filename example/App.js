import { Text, Button, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import {InitiateCheckout,InitiateOauth} from 'bitnob-react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitiateCheckout: false,
      isInitiateOauth:false
    }
  }

  InitiateCheckout = () => {
    return (
      <InitiateCheckout
        mode='sandbox'
        description="test"
        callbackUrl="test"
        successUrl=""
        notificationEmail="customer@gmail.com"
        customerEmail="customer@gmail.com"
        satoshis={2000}
        reference="test116"
        publicKey="your public key"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isInitiateCheckout: false })
        }}
        closeCallback={(res) => {
          this.setState({ isInitiateCheckout: false })
          console.log('------', res)
        }}
        successCallback={(success) => {
          console.log("----success", success)
        }}
      />
    )
  }
  InitiateOauth = () => {
    return (
      <InitiateOauth
        mode='sandbox'
        clientId="your clientId"
        scope={[
      "user:custom_ln_address",
        "user:verification_level",
        "user:email",
        "user:username",
        "user:ln_address"
      ]}
        state="test"
        redirectUrl="your redirect url"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isInitiateOauth: false })
        }}
        closeCallback={(res) => {
          this.setState({ isInitiateOauth: false })
          console.log('------', res)
        }}
        successCallback={(success) => {
          console.log("----success", success)
            this.setState({ isInitiateOauth: false })
        }}
      />
    )
  }
  render() {
    let { isInitiateCheckout,isInitiateOauth } = this.state
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
        <StatusBar backgroundColor={'transparent'} translucent={false} />
        {
          isInitiateCheckout ?
            this.InitiateCheckout()
            :
            isInitiateOauth ?
              this.InitiateOauth()
            :
            <>
            <Button onPress={() => this.setState({ isInitiateCheckout: true })}
              color={'blue'}
              title="InitiateCheckout"
                />
                <View style={{height:10}} ></View>
                <Button
                  onPress={() => this.setState({ isInitiateOauth: true })}
                  color={'blue'}
                  title="InitiateOauth"
              />
              </>
        }

      </SafeAreaView>
    )
  }
}