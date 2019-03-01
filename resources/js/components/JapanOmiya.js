import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TitleAndText from './TitleAndText.js';
import Edit from './Edit.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addText, clearText } from '../actions/AppActions';

class JapanOmiya extends Component {

    constructor(props) {
        super(props);
        this.state = {
            omiyaId: null,
            omiyaTitle: 'omiya App',
            omiyaText: 'This is omiya Text',
            omiyasData: '',
            mode: 'show',
        }
    }

    componentDidMount() {
        axios.get('/api/omiyas')
            .then(response => {
                console.log('omiyas.data:' + JSON.stringify(response.data))
                this.setState({
                    data: response.data,
                    nextUrl: response.data.next_page_url,
                    prevUrl: response.data.prev_page_url,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    switchMode() {
        this.setState({ mode: this.state.mode == "edit" ? "show" : "edit" })
    }

    click(param) {
        this.setState({
            omiyaTitle: param,
            omiyaId: 0
        })
    }

    render() {
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-md-3" style={{ padding: 0 }}>
                    <div className="card">
                        <div
                            className="card-header"
                            style={{ backgroundColor: "rgb(172, 27, 46)", color: "#FFFFFF", fontSize: 18 }}>
                            都道府県
                        </div>
                        <ul className="list-group">
                            {prefectures.map((prefecture) =>
                                < li className="list-group-item" onClick={() => this.click("test111")}>
                                    {prefecture}
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
                <OmiyaContent
                    mode={this.state.mode}
                    text={this.state.omiyaTitle}
                    omiyaId={this.state.omiyaId}
                    omiyaTitle={this.state.omiyaTitle}
                />

                {/* 以下テスト */}
                <button onClick={() => { this.switchMode() }} />
                <input type='text' ref='input' /><br />
                <button onClick={(e) => this.onAddBtnClicked(e)}   >Add</button>
                <button onClick={(e) => this.onClearBtnClicked(e)} >Clear</button>
                <ul>
                    {
                        //state中のオブジェクトをループさせて<li>要素を描画。stateは selector() メソッドで指定しているものがpropsとして渡ってくる
                        this.props.state.storedText.map((obj) =>
                            <li key={obj.id} >
                                {obj.text}
                            </li>
                        )
                    }
                </ul>
                {/* 以上テスト */}
            </div>

        </div>);
    }

    onAddBtnClicked(e) {
        let input = this.refs.input
        let text = input.value.trim()
        if (!text) return alert('何かテキストを入力してください。')
        input.value = ''
        // Appコンポーネントが connect() メソッドでラップされていることによって、dispatchメソッドを呼び出すことが可能になる
        // dispatch() メソッドで ActionCreator である addText() メソッドをラップして呼び出すことによってデータの変更を伝播する
        this.props.dispatch(addText(text))
    }

    //Clear ボタンをクリックした時に呼び出される
    onClearBtnClicked(e) {
        // dispatchメソッドで ActionCreator であるclearText() メソッドをラップして呼び出すことによってデータの変更を伝播する
        this.props.dispatch(clearText())
    }

}

class OmiyaContent extends Component {
    render() {
        console.log(this.props.mode)
        return (
            <div className="col-md-9" style={{ padding: 0 }}>
                {this.props.mode === 'show' ?
                    <TitleAndText
                        text={this.props.omiyaTitle}
                        omiyaId={this.props.omiyaId}
                        omiyaTitle={this.props.omiyaTitle}
                    />
                    : <Edit
                        text={this.props.omiyaTitle}
                        omiyaId={this.props.omiyaId}
                        omiyaTitle={this.props.omiyaTitle}
                    />}
            </div>

        )
    }
}

const prefectures = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県",
    "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県",
    "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県",
    "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];


// セレクターの定義: Appコンポーネントが必要とするデータを グローバルなstate 全体の中から取捨選択して取得する。今回は state 全体をそのままreturnしている
let selector = (state) => {
    // [storedText]というキー名はreducer.jsの最下部で設定している Store のキー名
    console.log(state.storedText);
    return {
        state: state // Key名とvalue名が同じなので return {state} でも可: Object Literal Shorthand
    }
}

export default connect(selector)(JapanOmiya)


