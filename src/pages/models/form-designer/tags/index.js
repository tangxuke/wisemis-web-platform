/**
 * 返回可用标签列表
 */
const htmlTags='p,a,div,span,img,...'.split(',');
const componentTags='Row,Col,Button,Icon,my-form,my-table,my-tree,my-modal,my-dialog'.split(',');

export default [...htmlTags,...componentTags];