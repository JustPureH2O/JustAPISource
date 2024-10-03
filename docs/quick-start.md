# 快速开始

## BA Memory <Badge type="tip" text="v 1.0" />

部署根目录：[https://api.justpureh2o.cn/v1/ba-memory/](https://api.justpureh2o.cn/v1/ba-memory/)

GitHub 仓库地址：[https://github.com/JustPureH2O/JustAPISource/](https://github.com/JustPureH2O/JustAPISource/)

用 `Pixi.js` 和 `pixi-spine` 做的在线碧蓝档案回忆大厅播放器。

### 使用示例

#### 观察模式

在请求 URL 中传入参数 `name`，可以获得对应学生的动画。如果未传入此参数，播放器将自动播放白洲梓原皮的 Live2D。**如果传入的参数未能被播放器识别，那么播放器将不会播放任何 Live2D**。

<div style="position:relative;width:100%;padding-bottom:56.25%;height:0">
	<iframe src="https://api.justpureh2o.cn/v1/ba-memory/?name=azusa_swimsuit" style="position:absolute;" width="100%" height="100%" />
</div>

```html
<div style="position:relative;width:100%;padding-bottom:56.25%;height:0">
	<iframe src="https://api.justpureh2o.cn/v1/ba-memory/?name=azusa_swimsuit" style="position:absolute;" width="100%" height="100%" />
</div>
```

#### 鉴赏模式

若想去除播放器底部的信息，可以在 URL 地址中加入参数 `appreciation` 进入纯鉴赏模式（可不传具体值）。

<div style="position:relative;width:100%;padding-bottom:56.25%;height:0">
	<iframe src="https://api.justpureh2o.cn/v1/ba-memory/?name=mika&appreciation" style="position:absolute;" width="100%" height="100%" />
</div>

```html
<div style="position:relative;width:100%;padding-bottom:56.25%;height:0">
	<iframe src="https://api.justpureh2o.cn/v1/ba-memory/?name=mika&appreciation" style="position:absolute;" width="100%" height="100%" />
</div>
```

#### 动画设置

在请求 URL 中加入 `animation` 项，并传入对应动画的 ID，播放器默认播放动画 `idle_01`。通常情况下，`start_idle_01` 是受广泛支持的。如果播放器未查询到指定的动画 ID，那么播放器将会自动开始播放字典序最靠前的动画。

<div style="position:relative;width:100%;padding-bottom:56.25%;height:0">
	<iframe src="https://api.justpureh2o.cn/v1/ba-memory/?name=koharu&appreciation&animation=start_idle_01" style="position:absolute;" width="100%" height="100%" />
</div>

```html
<div style="position:relative;width:100%;padding-bottom:56.25%;height:0">
	<iframe src="https://api.justpureh2o.cn/v1/ba-memory/?name=koharu&appreciation&animation=start_idle_01" style="position:absolute;" width="100%" height="100%" />
</div>
```

#### 音效设置

BGM 播放功能将在未来版本中实现……
