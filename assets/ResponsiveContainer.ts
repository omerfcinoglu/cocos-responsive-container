import { _decorator, Component, Node, UITransform, Widget } from "cc";
import { DeviceManager } from "./DeviceManager";
const { ccclass, property } = _decorator;

@ccclass("ResponsiveContainer")
export class ResponsiveContainer extends Component {
  @property(Node) background: Node = null;
  @property(Node) portraitBg: Node = null;
  @property(Node) landscapeBg: Node = null;

  @property(Node) topLeftSide: Node = null;
  @property(Node) botRightSide: Node = null;

  start() {
    window.addEventListener(
      "orientationchange",
      this.onOrientationChange.bind(this)
    );
    window.addEventListener("resize", this.onOrientationChange.bind(this));
    this.onOrientationChange();
  }

  resizeBackgrounds() {
    const deviceManager = DeviceManager.getInstance();
    const { w: deviceWidth, h: deviceHeight } = deviceManager.getDimension();

    this.background.children.forEach((child, i) => {
      console.log(`Resizing background child ${i}`);
      child.getComponent(UITransform).width = deviceWidth;
      child.getComponent(UITransform).height = deviceHeight;
    });

    const isLandscape = deviceManager.isLandscape();
    this.portraitBg.active = !isLandscape;
    this.landscapeBg.active = isLandscape;
  }

  alignSides() {
    const isLandscape = DeviceManager.getInstance().isLandscape();
    const { w: w, h: h } = DeviceManager.getInstance().getDimension();
    if (isLandscape) {
      this.topLeftSide.getComponent(Widget).isAlignLeft = true;
      this.topLeftSide.getComponent(Widget).isAlignRight = true;
      this.topLeftSide.getComponent(Widget).isAlignTop = true;
      this.topLeftSide.getComponent(Widget).isAlignBottom = true;
      this.topLeftSide.getComponent(Widget).left = w / 2;
      this.topLeftSide.getComponent(Widget).right = 0;
      this.topLeftSide.getComponent(Widget).bottom = 0;
      this.topLeftSide.getComponent(Widget).top = 0;
      this.topLeftSide.getComponent(Widget).updateAlignment();

      this.botRightSide.getComponent(Widget).isAlignLeft = true;
      this.botRightSide.getComponent(Widget).isAlignRight = true;
      this.botRightSide.getComponent(Widget).isAlignTop = true;
      this.botRightSide.getComponent(Widget).isAlignBottom = true;
      this.botRightSide.getComponent(Widget).left = 0;
      this.botRightSide.getComponent(Widget).right = w / 2;
      this.botRightSide.getComponent(Widget).bottom = 0;
      this.botRightSide.getComponent(Widget).top = 0;
      this.botRightSide.getComponent(Widget).updateAlignment();
    } else {
      this.topLeftSide.getComponent(Widget).isAlignLeft = true;
      this.topLeftSide.getComponent(Widget).isAlignRight = true;
      this.topLeftSide.getComponent(Widget).isAlignTop = true;
      this.topLeftSide.getComponent(Widget).isAlignBottom = true;
      this.topLeftSide.getComponent(Widget).left = 0;
      this.topLeftSide.getComponent(Widget).right = 0;
      this.topLeftSide.getComponent(Widget).top = 0;
      this.topLeftSide.getComponent(Widget).bottom = h / 2;
      this.topLeftSide.getComponent(Widget).updateAlignment();

      this.botRightSide.getComponent(Widget).isAlignLeft = true;
      this.botRightSide.getComponent(Widget).isAlignRight = true;
      this.botRightSide.getComponent(Widget).isAlignTop = true;
      this.botRightSide.getComponent(Widget).isAlignBottom = true;
      this.botRightSide.getComponent(Widget).left = 0;
      this.botRightSide.getComponent(Widget).right = 0;
      this.botRightSide.getComponent(Widget).bottom = 0;
      this.botRightSide.getComponent(Widget).top = h / 2;
      this.botRightSide.getComponent(Widget).updateAlignment();
    }
  }

  onOrientationChange() {
    this.resizeBackgrounds();
    this.alignSides();
  }
}
