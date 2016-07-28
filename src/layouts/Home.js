import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class Home extends Component {
    componentDidMount() {
    }

    render() {
        const {router} = this.props;
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to React Home!
                    如果这个是个很长很长得文字会怎么样呢？
                    getCurrentRoutes() - 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
                    jumpBack() - 跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
                    jumpForward() - 上一个方法不是调到之前的路由了么，用这个跳回来就好了。
                    jumpTo(route) - 跳转到已有的场景并且不卸载。
                    push(route) - 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去
                    pop() - 跳转回去并且卸载掉当前场景
                    replace(route) - 用一个新的路由替换掉当前场景
                    replaceAtIndex(route, index) - 替换掉指定序列的路由场景
                    replacePrevious(route) - 替换掉之前的场景
                    resetTo(route) - 跳转到新的场景，并且重置整个路由栈
                    immediatelyResetRouteStack(routeStack) - 用新的路由数组来重置路由栈
                    popToRoute(route) - pop到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
                    popToTop() - pop到栈中的第一个场景，卸载掉所有的其他场景。
                </Text>
                <TouchableOpacity onPress={()=> router.toAbout()}>
                    <Text> to Abort</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1
    },
});

export const LayoutComponent = Home;

export function mapStateToProps(state) {
    return {};
}