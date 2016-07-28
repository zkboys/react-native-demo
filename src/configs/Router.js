import React from 'react';
import ReactNative from 'react-native';
import {Navigator, Platform, BackAndroid} from 'react-native';
import _ from 'lodash';
import * as About from '../layouts/About';
import * as Comment from '../layouts/Comment';
import * as HomeComponent from '../layouts/Home';
import * as CustomSceneConfigs from '../configs/sceneConfig';
import connectComponent from '../utils/connectComponent';


const Home = connectComponent(HomeComponent);
const {} = Navigator;

const {
    SceneConfigs,
} = ReactNative;

class Router {
    constructor(navigator) {
        this.navigator = navigator;
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', ()=> {
                const routesList = this.navigator.getCurrentRoutes();
                const currentRoute = routesList[routesList.length - 1];
                if (currentRoute.name !== 'home') {
                    navigator.pop();
                    return true;
                }
                return false;
            });
        }
    }


    push(props = {}, route) {
        let routesList = this.navigator.getCurrentRoutes();
        let nextIndex = routesList[routesList.length - 1].index + 1;
        route.props = props;
        route.index = nextIndex;
        route.sceneConfig = route.sceneConfig ? route.sceneConfig : CustomSceneConfigs.customFloatFromRight;
        route.id = _.uniqueId();
        route.component = connectComponent(route.component);
        this.navigator.push(route);
    }


    pop() {
        this.navigator.pop();
    }


    toAbout(props) {
        this.push(props, {
            component: About,
            name: 'about',
        });
    }

    toComment(props) {
        this.push(props, {
            component: Comment,
            name: 'comment'
        })
    }
}


export default Router;
