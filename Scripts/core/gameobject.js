var Core;
(function (Core) {
    class GameObject extends createjs.Bitmap {
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(Config.Globals.AssetManifest.getResult(bitmap_asset));
            this.IsCentered = isCentered;
            this.x = x;
            this.y = y;
        }
        get IsCentered() {
            return this.m_isCentered;
        }
        set IsCentered(value) {
            if (value) {
                this.m_recalculatesize();
            }
            else {
                this.regX = 0.0;
                this.regY = 0.0;
            }
            this.m_isCentered = value;
        }
        m_recalculatesize() {
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }
    }
    Core.GameObject = GameObject;
})(Core || (Core = {}));
//# sourceMappingURL=gameobject.js.map