'use strict';
import Nav from '../components/Nav';
import {parseImgUrl} from '../utils';
import Spinner from '../components/base/Spinner';
import Icon from 'react-native-vector-icons/Ionicons';
import animations from '../configs/animations';

const React = require('react');
const ReactNative = require('react-native');
const {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
    View,
    Alert,
    Vibration,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
    Platform,
    LayoutAnimation,

} = ReactNative;
const {width, height} = Dimensions.get('window');
const authorImgSize = 35;
const replyFormHeight = 55;
const commentsHeight = height - 40 - 20 - replyFormHeight - 20;
const submitButtonWidth = 55;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height,
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
    },
    scrollview: {
        flex: 1,
    },
    replyFormWrapper: {
        height: replyFormHeight + 4,
        width: width,
        flexDirection: 'row',
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {
            width: -2,
            height: -2
        },
        shadowOpacity: 0.1,
        alignItems: 'center'
    },
    replyUserImgWrapper: {
        width: authorImgSize + 15 * 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    userImg: {
        height: authorImgSize,
        width: authorImgSize,
        resizeMode: Image.resizeMode.contain,
        borderRadius: authorImgSize / 2
    },
    replyInputWrapper: {
        width: width - replyFormHeight - submitButtonWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    replyInput: {
        flex: 1,
        fontSize: 14,
        height: Platform.OS === 'ios' ? 14 * 2 : 55,
        //lineHeight: 14 * 1.4
    },
    submitIcon: {
        width: authorImgSize,
        height: authorImgSize
    }
});

const Row = React.createClass({
    _onClick: function () {
        this.props.onClick(this.props.data);
    },
    render: function () {
        return (
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    },
});

const RefreshControlExample = React.createClass({
    statics: {
        title: '<RefreshControl>',
        description: 'Adds pull-to-refresh support to a scrollview.'
    },

    getInitialState() {
        Keyboard.addListener('keyboardWillShow', this.updateKeyboardSpace.bind(this));
        Keyboard.addListener('keyboardWillHide', this.resetKeyboardSpace.bind(this));

        if (Platform.OS === 'android') {
            Keyboard.addListener('keyboardDidShow', this.updateKeyboardSpace.bind(this));
            Keyboard.addListener('keyboardDidHide', this.resetKeyboardSpace.bind(this));
        }
        return {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map(
                (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
        };
    },
    updateKeyboardSpace(e) {
        LayoutAnimation.configureNext(animations.keyboard.layout.spring);
        this.commentsView && this.commentsView.setNativeProps({
            style: {
                height: commentsHeight - e.endCoordinates.height
            }
        })
    },

    resetKeyboardSpace() {
        LayoutAnimation.configureNext(animations.keyboard.layout.spring);
        this.commentsView && this.commentsView.setNativeProps({
            style: {
                height: commentsHeight
            }
        })
    },
    _onClick(row) {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    },
    _renderReplySubmiteIcon() {
        if (false) {
            return (
                <View>
                    <Spinner
                        style={styles.submitIcon}
                    />
                </View>
            );
        }
        return (
            <Icon
                name={'ios-reply'}
                size={28}
                color='rgba(0,0,0,0.35)'
                style={styles.submitIcon}
            />
        );
    },
    _renderReplyForm() {
        const user = {
            avatar_url: 'http://img.taopic.com/uploads/allimg/121005/219049-1210051TK021.jpg',
            loginname: '王小二',

        }
        if (!user) return null;

        const userImg = parseImgUrl(user.avatar_url);
        let replyFormBorder = {};
        if (Platform.OS === 'android') {
            replyFormBorder = {
                borderTopWidth: 1,
                borderTopColor: 'rgba(0,0,0,0.08)'
            };
        }

        return (
            <View style={[styles.replyFormWrapper, replyFormBorder]}>
                <View style={styles.replyUserImgWrapper}>
                    <TouchableOpacity onPress={()=>this.props.router.toUser({
						userName: user.loginname
					})}>
                        <Image
                            style={styles.userImg}
                            source={{uri: userImg}}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.replyInputWrapper}>
                    <TextInput
                        ref={view=>this.textInput=view}
                        value={this.state.textInput}
                        multiline={true}
                        placeholder='嘿，说点啥吧'
                        style={styles.replyInput}
                        onChangeText={(text) => {
                            this.textInput.setNativeProps({
                                text: text
                            });
                            this.textInputValue = text
                        }}
                    />
                </View>

                <View style={styles.submit}>
                    <TouchableOpacity
                        onPress={() => this._doReply()}>
                        {this._renderReplySubmiteIcon()}
                    </TouchableOpacity>
                </View>
            </View>
        )
    },

    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row} onClick={this._onClick}/>;
        });
        const refreshControl = {
            tintColor: "rgba(241,196,15, 1)",
            title: "正在加载...",
            colors: ["rgba(241,196,15, 1)", "rgba(241,196,15, 0.9)", "rgba(241,196,15, 0.8)"],
            progressBackgroundColor: "#292829",
        };
        const {router, actions} = this.props;
        const count = 10;
        let navs = {
            Left: {
                text: '返回',
                onPress: ()=> {
                    router.pop()
                }
            },
            Center: {
                text: '评论 ' + count,
                onPress: ()=> {
                    if (count > 0) {
                        this.commentList.scrollToTop();
                    }
                }
            },
            Right: {
                text: '登录',
                onPress: ()=> {
                    actions.toast('这是一个Toast');
                    Vibration.vibrate(); // 震动？
                    // Alert.alert(
                    //     'Alert Title',
                    //     null,
                    //     [
                    //         {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
                    //         {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
                    //         {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
                    //     ]
                    // )
                }
            }
        };
        return (
            <View style={styles.container}>
                <Nav navs={navs}/>
                <View ref={view=>this.commentsView=view}
                      style={[styles.comments,{
					  	height: true ? commentsHeight : commentsHeight + replyFormHeight
					  }]}>
                    <ScrollView
                        style={styles.scrollview}
                        refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            {...refreshControl}
                        />
                    }>
                        {rows}
                    </ScrollView>

                </View>
                {this._renderReplyForm()}
            </View>
        );
    },

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            const rowData = Array.from(new Array(10))
                .map((val, i) => ({
                    text: 'Loaded row ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 5000);
    },
});

export const LayoutComponent = RefreshControlExample;

export function mapStateToProps(state) {
    return {};
}