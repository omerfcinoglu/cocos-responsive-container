import { _decorator, Component, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DeviceManager")
export class DeviceManager extends Component {
  private static instance: DeviceManager | null = null;

  private constructor() {
    super();
  }

  public static getInstance(): DeviceManager {
    if (!DeviceManager.instance) {
      DeviceManager.instance = new DeviceManager();
    }
    return DeviceManager.instance;
  }

  getDimension() {
    return {
      w: view.getVisibleSize().width,
      h: view.getVisibleSize().height,
    };
  }

  isLandscape() {
    const { w, h } = this.getDimension();
    return w > h;
  }
}
