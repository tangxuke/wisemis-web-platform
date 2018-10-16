<template>
    <Row>
        <span>
            Render类型：
            <RadioGroup v-model="renderType">
                <Radio label="tree">标签树</Radio>
                <Radio label="html">模板代码</Radio>
            </RadioGroup>
        </span>
        <div style="margin-top:10px;">
            <div v-if="renderType==='tree'">
            <div is="Col" :span="8">
                    <Row>
                        <ButtonGroup>
                            <Button @click="AppendSameLevelNode">添加同级</Button>
                            <Button @click="AppendChildLevelNode" :disabled="isTextNode || selectedNode===null">添加下级</Button>
                            <Button @click="RemoveNode"  :disabled="selectedNode===null">删除</Button>
                        </ButtonGroup>
                    </Row>
                    <Row>
                        <Tree :data="oVue.render" @on-select-change="onSelectChange" ref="tree"></Tree>
                    </Row>
                </div>
                <div is="Col" :span="16">
                    <div v-if="selectedNode!==null" style="background-color:#f0f0f0;border-radius: 5px; padding:10px;">
                        <Tabs v-model="selectedTab">
                            <TabPane name="tag" label="tag">
                                <p>
                                    是否文本节点：<i-switch v-model="isTextNode"/>
                                </p>
                                <Row>
                                    <Form>
                                    <Col :span="12">
                                        <FormItem label="文本内容" v-if="isTextNode"><Input v-model="text" type="textarea" autosize/></FormItem>
                                        <FormItem label="标签名称" v-if="!isTextNode">                                   
                                            <Input v-model="tag" placeholder="标签名称"/>
                                        </FormItem>
                                    </Col>
                                    <Col :span="12">
                                        <Row>
                                            <Col :span="12"><FormItem label="Ref"><Input v-model="ref"/></FormItem></Col>
                                            <Col :span="12"><FormItem label="Key"><Input v-model="key"/></FormItem></Col>
                                        </Row>
                                    </Col>
                                    </Form>
                                </Row>
                                <Row><Checkbox v-model="vif">v-if</Checkbox><Input v-if="vif" v-model="vif_expr" placeholder="请输入v-if表达式"/></Row>
                                <Row><Checkbox v-model="vshow">v-show</Checkbox><Input v-if="vshow" v-model="vshow_expr" placeholder="请输入v-show表达式"/></Row>
                                <Row><Checkbox v-model="vfor">v-for</Checkbox><Input v-if="vfor" v-model="vfor_expr" placeholder="请输入v-for表达式"/></Row>
                                
                            </TabPane>
                            <TabPane name="props" label="props" v-show="!isTextNode && tag">
                                <Row>
                                    <div is="Col" :span="8">
                                        <Form :label-width="80">
                                            <FormItem label="属性类型">
                                                <Select v-model="prop_type" @on-change="OnPropTypeChange">
                                                    <Option value="props">props</Option>
                                                    <Option value="class">class</Option>
                                                    <Option value="style">style</Option>
                                                    <Option value="attrs">attrs</Option>
                                                    <Option value="domProps">domProps</Option>
                                                    <Option value="on">on</Option>
                                                </Select>
                                            </FormItem>
                                            <FormItem label="属性名">
                                                <Input v-model="props_name"/>
                                            </FormItem>
                                            <FormItem label="属性值"><Input type="textarea" v-model="props_value" autosize @on-keydown="onKeyDown" ref="control"/></FormItem>
                                            <FormItem>
                                                <Button type="success" @click="ApplyProp">确定</Button>
                                                <Button style="margin-left:5px;" @click="ClearProp">清除</Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                    <div is="Col" :span="16" style="padding:0 10px;">
                                        <Checkbox v-model="show_all_props">显示所有</Checkbox>
                                        <Table :columns="props_columns" :data="props_data" @on-row-click="onPropsRowClick"></Table>
                                    </div>
                                </Row>
                            </TabPane>
                        </Tabs> 
                        <Row>
                            <Button type="success" @click="Apply" :disabled="selectedNode===null" style="margin-top:5px;">应用</Button>
                        </Row>
                    </div>
                    
                    
                </div> 
            </div>

            <div v-else>
                <Input 
                    type="textarea"
                    v-model="oVue.htmlCode" 
                    placeholder="请在这里输入HTML代码，有且只有一个根元素"
                    :rows="15" />
            </div>           
        </div>

        
        <div is="Col" :span="24" style="padding:10px;margin-top:10px;">
            <Button @click="createRenderCode">生成Render代码</Button>
            <Input :value="renderCode" type="textarea" :rows="10" />
        </div>
    </Row>
    
</template>

<script src="./script.js">
</script>