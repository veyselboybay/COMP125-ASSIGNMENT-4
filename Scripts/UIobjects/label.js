var UIobjects;
(function (UIobjects) {
    class Label extends createjs.Text {
        constructor(text = "", font_size = "20px", font_family = "Consolas", font_color = "#000000", x = 0, y = 0, isCentered = false) {
            super(text, font_size + " " + font_family, font_color);
            this.IsCentered = isCentered;
            if (isCentered) {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }
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
            this.regX = this.getMeasuredWidth() * 0.5;
            this.regY = this.getMeasuredHeight() * 0.5;
        }
        setText(new_Text) {
            this.text = new_Text;
            if (this.IsCentered) {
                this.m_recalculatesize();
            }
        }
    }
    UIobjects.Label = Label;
})(UIobjects || (UIobjects = {}));
//# sourceMappingURL=label.js.map