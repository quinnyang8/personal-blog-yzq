//该模块用来配置editor编辑器


//cms的编辑器
const editorCms = {

    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: true, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: true, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: true, // 导航目录
    /* 2.1.8 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: true, // 预览
}



//用户评论的编辑器
const userComment = {

    bold: false, // 粗体
    italic: false, // 斜体
    header: false, // 标题
    underline: false, // 下划线
    strikethrough: false, // 中划线
    mark: false, // 标记
    superscript: false, // 上角标
    subscript: false, // 下角标
    quote: false, // 引用
    ol: true, // 有序列表
    ul: false, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: false, // 表格
    fullscreen: false, // 全屏编辑
    readmodel: false, // 沉浸式阅读
    htmlcode: false, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: false, // 上一步
    redo: false, // 下一步
    trash: true, // 清空
    save: false, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: false, // 导航目录
    /* 2.1.8 */
    alignleft: false, // 左对齐
    aligncenter: false, // 居中
    alignright: false, // 右对齐
    /* 2.2.1 */
    subfield: false, // 单双栏模式
    preview: false, // 预览
}




export const editor = editorCms
export const commentEditor = userComment




