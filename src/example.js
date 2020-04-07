const defaultExample = `# 目录
[TOC]

## 方程

1. 一元二次方程求根公式： $$ x = \\frac {-b \\pm \\sqrt{b^2 - 4ac }}{2a}$$, ( $$ b^2 - 4ac \\ge 0$$ )

1. &nbsp;$$\\Delta = b^2 - 4ac $$, 若 $$ \\Delta \\gt 0$$, 方程有两个不相等实根；若$$ \\Delta \\lt 0$$, 方程无实根; 若$$ \\Delta = 0$$,方程有两个相等的实根。


## 图表

\`\`\`flow
sequenceDiagram
    participant 张三
    participant 李四
    王五->>赵六: 嗨 赵六,你好吗?
    loop 沉思
        赵六->>赵六: 沉思
    end
    Note right of 赵六: 理性的想了很久
    赵六-->>李四: 还不错!
    赵六->>李四: 你呢?
    李四-->>赵六: 好的不能再好了！
\`\`\`
`;
export default window.localStorage.getItem('cached') || defaultExample;