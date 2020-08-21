var UIobjects;
(function (UIobjects) {
    class Button extends Core.GameObject {
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(bitmap_asset, x, y, isCentered);
            this.IsCentered = isCentered;
            this.x = x;
            this.y = y;
            this.on("mouseover", this.m_mouseover);
            this.on("mouseout", this.m_mouseout);
        }
        m_mouseover() {
            this.alpha = 0.7;
        }
        m_mouseout() {
            this.alpha = 1.0;
        }
    }
    UIobjects.Button = Button;
})(UIobjects || (UIobjects = {}));
//# sourceMappingURL=button.js.map