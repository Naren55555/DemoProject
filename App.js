
import React, { Component } from 'react';
import {StyleSheet,Text,View} from 'react-native';
// import BackgroundTask from 'react-native-background-task'
import BackgroundJob from "react-native-background-job";
const regularJobKey = "regularJobKey";
const exactJobKey = "exactJobKey";
const foregroundJobKey = "foregroundJobKey"
const everRunningJobKey = "everRunningJobKey";

// BackgroundTask.define(() => {
//   console.log('Hello from a background task')
//   BackgroundTask.finish()
// })
BackgroundJob.register({
  jobKey: regularJobKey,
  job: () => console.log(`Background Job fired!. Key = ${regularJobKey}`)
});
BackgroundJob.register({
  jobKey: exactJobKey,
  job: () => {
    console.log(`${new Date()}Exact Job fired!. Key = ${exactJobKey}`);
  }
});
BackgroundJob.register({
  jobKey: foregroundJobKey,
  job: () => console.log(`Exact Job fired!. Key = ${foregroundJobKey}`)
});
BackgroundJob.register({
  jobKey: everRunningJobKey,
  job: () => console.log(`Ever Running Job fired! Key=${everRunningJobKey}`)
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };
  }
    render() {
        return (
          <View style={styles.container}>
          <Text style={styles.welcome}>Testing BackgroundJob</Text>
          <Text style={styles.instructions}>
            Try connecting the device to the developer console, schedule an event
            and then quit the app.
          </Text>
          <Text>
            Scheduled jobs:
            {this.state.jobs.map(({ jobKey }) => jobKey)}
          </Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              BackgroundJob.schedule({
                jobKey: regularJobKey,
                notificationTitle: "Notification title",
                notificationText: "Notification text",
                period: 15000
              });
            }}
          >
            <Text>Schedule regular job</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              BackgroundJob.schedule({
                jobKey: exactJobKey,
                period: 1000,
                exact: true
              });
            }}
          >
            <Text>Schedule exact job</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              BackgroundJob.schedule({
                jobKey: foregroundJobKey,
                period: 1000,
                exact: true,
                allowExecutionInForeground: true
              });
            }}
          >
            <Text>Schedule exact foreground job</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              BackgroundJob.isAppIgnoringBatteryOptimization(
                (error, ignoringOptimization) => {
                  if (ignoringOptimization === true) {
                    BackgroundJob.schedule({
                      jobKey: everRunningJobKey,
                      period: 1000,
                      exact: true,
                      allowWhileIdle: true
                    });
                  } else {
                    console.log(
                      "To ensure app functions properly,please manually remove app from battery optimization menu."
                    );
                    //Dispay a toast or alert to user indicating that the app needs to be removed from battery optimization list, for the job to get fired regularly
                  }
                }
              );
            }}
          >
            <Text>Schedule ever running job</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              BackgroundJob.cancel({ jobKey: regularJobKey });
            }}
          >
            <Text>Cancel regular job</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              BackgroundJob.cancelAll();
            }}
          >
            <Text>CancelAll</Text>
          </TouchableHighlight>
        </View>
        )
    }
    
    componentDidMount(){
  
      BackgroundTask.schedule()

    }
    shouldComponentUpdate(nextProps, nextState){
    
      return false;
  }
  
  componentWillUpdate(nextProps, nextState) {
    
  }
}

const styles = StyleSheet.create({
  button: { padding: 20, backgroundColor: "#ccc", marginBottom: 10 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: { fontSize: 20, textAlign: "center", margin: 10 },
  instructions: { textAlign: "center", color: "#333333", marginBottom: 5 }
});

export default App;
