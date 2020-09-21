const vscode = require('vscode')
const api = require('./translate-api')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('translate.zntoen', async function () {
    /**
     * @type {string} 选择的单词
     */
    let selectWord
    const currentEditor = vscode.window.activeTextEditor
    const currentSelect = currentEditor.document.getText(currentEditor.selection)
    const data = await api.translate(currentSelect, 'zh', 'en')
    const result = data.data.trans_result[0].dst
    // 基于空格分割
    const list = result.split(' ')
    if (list.length > 0) {
      const arr = []
      // - 号连接
      arr.push(list.map(v => v.toLocaleLowerCase()).join('-'))
      // 下划线连接
      arr.push(list.map(v => v.toLocaleLowerCase()).join('_'))
      // 大驼峰
      arr.push(list.map(v => v.charAt(0).toLocaleUpperCase() + v.slice(1)).join(''))
      // 小驼峰
      arr.push(list.map((v, i) => {
        if (i !== 0) {
          return v.charAt(0).toLocaleUpperCase() + v.slice(1)
        }
        return v.toLocaleLowerCase()
      }).join(''))
      selectWord = await vscode.window.showQuickPick(arr, { placeHolder: '请选择要替换的变量名' })
    } else {
      selectWord = list
    }

    if (selectWord) {
      currentEditor.edit(editBuilder => {
        editBuilder.replace(currentEditor.selection, selectWord)
      })
    }
  })

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() { }

module.exports = {
  activate,
  deactivate
}
