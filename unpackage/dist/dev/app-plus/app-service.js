if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$u = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$t = {
    name: "uni-easyinput",
    emits: [
      "click",
      "iconClick",
      "update:modelValue",
      "input",
      "focus",
      "blur",
      "confirm",
      "clear",
      "eyes",
      "change",
      "keyboardheightchange"
    ],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e2) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-09fd5285"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$s = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "70px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value, oldVal) => {
            const isEqual2 = this.form._isEqual(value, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules = null) {
        this.userRules = rules;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            formData
          );
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.form && type && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 70 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$props.required }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-462874dd"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e2) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules === void 0) {
        return message["default"];
      }
      for (var i2 = 0; i2 < rules.length; i2++) {
        let rule = rules[i2];
        let vt2 = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt2]) {
          result = RuleValidatorHelper[vt2](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt2);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt2) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt2);
        }
      } catch (e2) {
        result = this._getMessage(rule, e2.message, vt2);
      }
      return result;
    }
    _getMessage(rule, message, vt2) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt2] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i2 = 0; i2 < range.length; i2++) {
        const item = range[i2];
        if (types.object(item) && item.value !== void 0) {
          list[i2] = item.value;
        } else {
          list[i2] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i2 = 0; i2 < value.length; i2++) {
        const element = value[i2];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules) => {
    const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a2, b2) => a2 += `#${b2}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object));
    let formData = {};
    for (let i2 in newData) {
      let path = name2arr(i2);
      objSet(formData, path, newData[i2]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v2) => isNumber(v2) ? Number(v2) : v2);
    return field;
  };
  const objSet = (object, path, value) => {
    if (typeof object !== "object")
      return object;
    _basePath(path).reduce((o2, k, i2, _2) => {
      if (i2 === _2.length - 1) {
        o2[k] = value;
        return null;
      } else if (k in o2) {
        return o2[k];
      } else {
        o2[k] = /^[0-9]{1,}$/.test(_2[i2 + 1]) ? [] : {};
        return o2[k];
      }
    }, object);
    return object;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o2, k) => {
      return (o2 || {})[k];
    }, object);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules) => {
    let isNoField = false;
    for (let i2 = 0; i2 < rules.length; i2++) {
      const ruleData = rules[i2];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a2, b2) => {
    if (a2 === b2) {
      return a2 !== 0 || 1 / a2 === 1 / b2;
    }
    if (a2 == null || b2 == null) {
      return a2 === b2;
    }
    var classNameA = toString.call(a2), classNameB = toString.call(b2);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a2 === "" + b2;
      case "[object Number]":
        if (+a2 !== +a2) {
          return +b2 !== +b2;
        }
        return +a2 === 0 ? 1 / +a2 === 1 / b2 : +a2 === +b2;
      case "[object Date]":
      case "[object Boolean]":
        return +a2 === +b2;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a2), propsB = Object.getOwnPropertyNames(b2);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i2 = 0; i2 < propsA.length; i2++) {
        var propName = propsA[i2];
        if (a2[propName] !== b2[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a2.toString() == b2.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$r = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i2 in this.$refs) {
              const vm = this.$refs[i2];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:182", "当前 uni-froms 组件缺少 ref 属性");
            formVm.setValue(name, value);
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules) {
        this.formRules = Object.assign({}, this.formRules, rules);
        this.validator = new SchemaValidator(rules);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type) {
        for (let i2 in this.dataValue) {
          const itemData = this.childrens.find((v2) => v2.name === i2);
          if (itemData) {
            if (this.formData[i2] === void 0) {
              this.formData[i2] = this._getValue(i2, this.dataValue[i2]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:289", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i2 in invalidFields) {
          const item = this.childrens.find((v2) => realName(v2.name) === i2);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i2 in childrens) {
          const child = childrens[i2];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v2) => {
            let vName = realName(v2);
            let value = getDataValue(v2, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-9a1e3c32"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  class GlobalRequest {
    constructor(baseUrl, timeout2) {
      this.baseUrl = baseUrl;
      this.timeout = timeout2;
    }
    request(url, methodType, headers, body, successCallback, failCallback) {
      const option = {
        url: this.baseUrl + url,
        method: methodType,
        header: headers,
        timeout: this.timeout,
        success: successCallback,
        fail: failCallback
      };
      if (body != null)
        option.data = body;
      return uni.request(option);
    }
    get(url, headers, successCallback, failCallback) {
      return this.request(url, "GET", headers, null, successCallback, failCallback);
    }
    post(url, headers, data, successCallback, failCallback) {
      return this.request(url, "POST", headers, data, successCallback, failCallback);
    }
    put(url, headers, data, successCallback, failCallback) {
      return this.request(url, "PUT", headers, data, successCallback, failCallback);
    }
    patch(url, headers, data, successCallback, failCallback) {
      return this.request(url, "PATCH", headers, data, successCallback, failCallback);
    }
    delete(url, headers, successCallback, failCallback) {
      return this.request(url, "DELETE", headers, null, successCallback, failCallback);
    }
    uploadFile(url, file, headers, formData, successCallback, failCallback) {
      return uni.uploadFile({
        url: this.baseUrl + url,
        filePath: file,
        name: "file",
        header: headers,
        timeout: this.timeout,
        formData,
        success: successCallback,
        fail: failCallback
      });
    }
  }
  const timeout = 1e3 * 60 * 3;
  const request = new GlobalRequest("http://192.168.43.71:5225", timeout);
  const defaultFailBack = (res) => formatAppLog("log", "at module/Request.js:65", res);
  function imgSrc(source) {
    return `${request.baseUrl}/img/${source}`;
  }
  function Get(url, headers, successCallback, failCallback = defaultFailBack) {
    return request.get(url, headers, successCallback, failCallback != void 0 ? failCallback : null);
  }
  function Post(url, headers, data, successCallback, failCallback = defaultFailBack) {
    return request.post(url, headers, data, successCallback, failCallback != void 0 ? failCallback : null);
  }
  function Put(url, headers, data, successCallback, failCallback = defaultFailBack) {
    return request.put(url, headers, data, successCallback, failCallback != void 0 ? failCallback : null);
  }
  function Patch(url, headers, data, successCallback, failCallback = defaultFailBack) {
    return request.patch(url, headers, data, successCallback, failCallback != void 0 ? failCallback : null);
  }
  function Delete(url, headers, successCallback, failCallback = defaultFailBack) {
    return request.delete(url, headers, successCallback, failCallback != void 0 ? failCallback : null);
  }
  function UploadFile(url, file, headers, formData, successCallback, failCallback = defaultFailBack) {
    return request.uploadFile(url, file, headers, formData, successCallback, failCallback != void 0 ? failCallback : null);
  }
  function Login(email, password, successCallback, failCallback) {
    Post("/Api/User/Login", {}, {
      email,
      password
    }, successCallback, failCallback);
  }
  function Register(email, password, checkCode, successCallback, failCallback) {
    Put(`/Api/User/Register/${checkCode}`, {}, {
      email,
      password
    }, successCallback, failCallback);
  }
  function GetCheckCode(email, length, successCallback, failCallback) {
    Get(`/Api/User/GetCheckCode/${length}?email=${email}`, {}, successCallback, failCallback);
  }
  function CheckCodeLogin(email, checkCode, successCallback, failCallback) {
    Post(`/Api/User/CheckCodeLogin/${checkCode}?email=${email}`, {}, {}, successCallback, failCallback);
  }
  function VerifyToken(userId, token, successCallback) {
    Post("/Api/User/VerifyToken", {}, {
      userId,
      token
    }, successCallback);
  }
  const user = uni.getStorageSync("user");
  const auth = {
    "token": user.token
  };
  const formDataAuth = {
    "ContentType": "multipart/form-data",
    "token": user.token
  };
  function loading(title, func, expire) {
    uni.showLoading({
      title,
      duration: expire
    });
    const timer = setTimeout(() => {
      func();
      clearTimeout(timer);
      uni.hideLoading();
    }, expire);
  }
  function delayToRun(func, expire) {
    const timer = setTimeout(() => {
      func();
      clearTimeout(timer);
    }, expire);
  }
  function invalidEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const CalendarDisplayWay = {
    week: 1,
    month: 2,
    day: 3,
    year: 4
  };
  function monthDays(year, month) {
    switch (month) {
      case 1:
        return 31;
      case 2:
        if (year % 4 == 0 && year % 400 != 0)
          return 29;
        else
          return 28;
      case 3:
        return 31;
      case 4:
        return 30;
      case 5:
        return 31;
      case 6:
        return 30;
      case 7:
      case 8:
        return 31;
      case 9:
        return 30;
      case 10:
        return 31;
      case 11:
        return 30;
      case 12:
        return 31;
    }
  }
  function dateEquals(date1, date2) {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
  }
  function timeWithoutSeconds(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hourStr = hours > 9 ? hours : "0" + hours;
    const minuteStr = minutes > 9 ? minutes : "0" + minutes;
    return `${hourStr}:${minuteStr}`;
  }
  function ValueText(value, text) {
    this.value = value;
    this.text = text;
  }
  const priority = [
    new ValueText(1, "重要且紧急"),
    new ValueText(2, "重要但不紧急"),
    new ValueText(3, "不重要但紧急"),
    new ValueText(4, "不重要也不紧急")
  ];
  const frequency = [
    new ValueText(0, "不重复"),
    new ValueText(1, "每天"),
    new ValueText(2, "每周"),
    new ValueText(3, "每月"),
    new ValueText(4, "每年")
  ];
  class PageOption {
    constructor(current, size, total) {
      this.current = current;
      this.size = size;
      this.total = total;
      this.data = [];
    }
    count() {
      return Math.ceil(this.total / this.size);
    }
  }
  class ReminderInfo {
    constructor(mode2, value, timing) {
      this.mode = mode2;
      this.value = value;
      this.timing = timing;
    }
    static getModeValueText(reminder) {
      switch (reminder.mode) {
        case 1:
          return `${reminder.value == 0 ? "准时" : reminder.value + "分钟前"}`;
        case 2:
          return `${reminder.value}小时前`;
        case 3:
          return `${reminder.value}天前`;
        case 4:
          return `${reminder.value}周前`;
        case 5:
          return `${reminder.value}月前`;
      }
    }
    static getInstance(mode2, value, beginTime) {
      const date = new Date(beginTime);
      switch (mode2) {
        case 1:
          date.setMinutes(date.getMinutes() - value);
          break;
        case 2:
          date.setHours(date.getHours() - value);
          break;
        case 3:
          date.setDate(date.getDate() - value);
          break;
        case 4:
          date.setDate(date.getDate() - value * 7);
          break;
        case 5:
          date.setMonth(date.getMonth() - value);
          break;
      }
      return new ReminderInfo(mode2, value, date);
    }
  }
  class KeyValueText extends ValueText {
    constructor(key, value, text) {
      super(value, text);
      this.key = key;
    }
  }
  const weekdays = [
    new KeyValueText("sunday", 0, "星期日"),
    new KeyValueText("monday", 1, "星期一"),
    new KeyValueText("tuesday", 2, "星期二"),
    new KeyValueText("wednesday", 3, "星期三"),
    new KeyValueText("thursday", 4, "星期四"),
    new KeyValueText("friday", 5, "星期五"),
    new KeyValueText("saturday", 6, "星期六")
  ];
  const customDef = [
    new ValueText(0, "一直"),
    new ValueText(1, "截止到"),
    new ValueText(2, "重复次数")
  ];
  function getDateStr(date = /* @__PURE__ */ new Date()) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }
  function getDateTimeStr(date = /* @__PURE__ */ new Date(), thisYear) {
    if (date.getFullYear() == thisYear)
      return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()].text} ${timeWithoutSeconds(date)}`;
    else
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()].text} ${timeWithoutSeconds(date)}`;
  }
  function copy(src, to) {
    for (let pro in src) {
      to[pro] = src[pro];
    }
  }
  function remindModeValues(mode2) {
    const data = [];
    switch (mode2) {
      case 1:
        for (let i2 = 0; i2 <= 60; i2++)
          data.push(i2);
        break;
      case 2:
        for (let i2 = 1; i2 <= 24; i2++)
          data.push(i2);
        break;
      case 3:
        for (let i2 = 1; i2 <= 31; i2++)
          data.push(i2);
        break;
      case 4:
        for (let i2 = 1; i2 <= 52; i2++)
          data.push(i2);
        break;
      case 5:
        for (let i2 = 1; i2 <= 36; i2++)
          data.push(i2);
        break;
    }
    return data;
  }
  function weekDaySign(day) {
    switch (day) {
      case 0:
        return "周日";
      case 1:
        return "周一";
      case 2:
        return "周二";
      case 3:
        return "周三";
      case 4:
        return "周四";
      case 5:
        return "周五";
      case 6:
        return "周六";
    }
  }
  function getRuleText(task) {
    if (task.period == null || task.period == 0)
      return "不重复";
    var res = "";
    if (task.custom == null) {
      const period = task.period;
      const innerStr = period == 1 ? "" : period;
      switch (task.periodUnit) {
        case 1:
          res += `每${innerStr}天`;
          break;
        case 2:
          res += `每${innerStr}周`;
          break;
        case 3:
          res += `每${innerStr}个月`;
          break;
        case 4:
          res += `每${innerStr}年`;
          break;
      }
    } else {
      for (let pro in task.custom) {
        res += `${weekDaySign(task.custom[pro])},`;
      }
      res = res.substring(0, res.length - 1);
    }
    if (task.count != null) {
      res += `;重复${task.count}次`;
    }
    if (task.deadline != null) {
      res += `;截止到${getDateStr(task.deadline)}`;
    }
    return res;
  }
  const TaskState = {
    finished: 1,
    unfinished: 2,
    cancelled: 3,
    abondoned: 4
  };
  function onlyDate(date) {
    const res = new Date(date);
    res.setHours(0);
    res.setMinutes(0);
    res.setSeconds(0);
    res.setMilliseconds(0);
    return res;
  }
  function dateGE(date1, date2) {
    return onlyDate(date1).getTime() >= onlyDate(date2).getTime();
  }
  const persistDays = [
    new KeyValueText(-1, 0, "永远"),
    new KeyValueText(7, 1, "7天"),
    new KeyValueText(30, 2, "30天"),
    new KeyValueText(
      100,
      3,
      "100天"
    ),
    new KeyValueText(180, 4, "180天"),
    new KeyValueText(365, 5, "365天")
  ];
  class HabitReminder {
    constructor(time, habitId) {
      this.reminderId = null;
      this.time = time;
      this.habitId = habitId;
      this.toDelete = false;
    }
  }
  const ADayMillseconds = 1e3 * 60 * 60 * 24;
  function buildElById(ref) {
    const id = "#" + ref.attributes.id;
    uni.createSelectorQuery().select(id).boundingClientRect().exec((res) => {
      const bound = res[0];
      const el = {
        offsetLeft: bound.left,
        offsetTop: bound.top,
        offsetHeight: bound.height,
        offsetWidth: bound.width
      };
      ref.$el = el;
    });
  }
  function getElBound(selector, callback) {
    uni.createSelectorQuery().select(selector).boundingClientRect().exec(callback);
  }
  function notifyTaskWithModal(reminder, finishCallback) {
    formatAppLog("log", "at module/Common.js:329", reminder);
    uni.showModal({
      title: `任务：${reminder.taskTitle}        --${priority[reminder.taskPriority - 1].text}`,
      content: reminder.taskDescription,
      confirmText: "关闭",
      cancelText: "完成",
      cancelColor: "rgb(0,75,235)",
      success: (res) => finishCallback(reminder, res)
    });
  }
  function notifyTask(reminder, finishCallback) {
    const payload = {};
    copy(reminder, payload);
    payload.timing = payload.timing.getTime();
    payload.route = "/pages/index";
    plus.push.createMessage(reminder.taskDescription, payload, {
      title: `任务：${reminder.taskTitle}        --${priority[reminder.taskPriority - 1].text}`,
      when: /* @__PURE__ */ new Date()
    });
  }
  function notifyHabit(reminder, finishCallback) {
    const payload = {};
    copy(reminder, payload);
    payload.route = "/pages/habit";
    plus.push.createMessage(reminder.taskDescription, payload, {
      title: `习惯：${reminder.habitName}`,
      when: /* @__PURE__ */ new Date()
    });
  }
  const TaskReminderKey$1 = "task-reminders";
  const HabitReminderKey$1 = "habit-reminders";
  const _imports_0$3 = "/static/login.gif";
  const _sfc_main$q = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const state = vue.reactive({
        email: "",
        password: "",
        checkCode: "",
        useCheckCode: false,
        isReg: false,
        checkCodeLen: 4,
        checkCodeText: "获取验证码",
        hasGotCode: false,
        hasLogan: true
      });
      const rules = vue.ref({
        email: [
          {
            required: true,
            errorMessage: "请输入电子邮箱！"
          },
          {
            trigger: "change",
            validateFunction: function(rule, value, data, callback) {
              formatAppLog("log", "at pages/login.vue:77", value);
              const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              formatAppLog("log", "at pages/login.vue:79", reg.match(value));
              if (!reg.match(value)) {
                callback("电子邮箱格式错误！");
              }
              callback();
              return true;
            }
          }
        ],
        password: {}
      });
      vue.onMounted(() => {
      });
      vue.onBeforeMount(() => {
        checkToken();
      });
      function login() {
        if (!state.useCheckCode)
          Login(state.email, state.password, afterLogin);
        else
          CheckCodeLogin(state.email, state.checkCode, afterLogin);
      }
      function afterLogin(res) {
        if (!res.data.succeeded) {
          uni.showToast({
            title: res.data.message,
            icon: "none"
          });
          return;
        }
        loading(res.data.message, () => {
          const data = res.data.data;
          const toStore = {};
          toStore.uid = data.id;
          toStore.token = data.token;
          toStore.avatar = data.avatar;
          toStore.nickName = data.nickName;
          toStore.email = data.email;
          toStore.role = data.role;
          auth.token = data.token;
          formDataAuth.token = data.token;
          uni.setStorage({
            key: "user",
            data: toStore,
            success: function() {
              uni.switchTab({
                url: "/pages/index"
              });
            }
          });
        }, 2e3);
      }
      function checkToken() {
        delayToRun(() => {
          const data = uni.getStorageSync("user");
          if (data == "") {
            state.hasLogan = false;
            return;
          }
          VerifyToken(data.uid, data.token, (res) => {
            const data2 = res.data;
            if (data2.succeeded) {
              if (data2.data) {
                uni.switchTab({
                  url: "/pages/index"
                });
              } else {
                uni.showToast({
                  title: "身份验证信息存在错误！请重新登录！",
                  icon: "none"
                });
                uni.clearStorage();
                state.hasLogan = false;
              }
            } else {
              uni.showToast({
                title: "身份验证信息已过期！",
                icon: "none"
              });
              uni.clearStorage();
              state.hasLogan = false;
            }
          });
        }, 2e3);
      }
      function getCheckCode() {
        state.hasGotCode = true;
        GetCheckCode(state.email, state.checkCodeLen);
        let i2 = 60;
        const timer = setInterval(() => {
          if (state.hasGotCode)
            state.checkCodeText = `${--i2}秒`;
          if (i2 == 0) {
            state.hasGotCode = false;
            state.checkCodeText = "获取验证码";
            clearInterval(timer);
          }
        }, 1e3);
      }
      function register() {
        Register(state.email, state.password, state.checkCode, (res) => {
          formatAppLog("log", "at pages/login.vue:195", res.data);
          uni.showToast({
            title: res.data.message
          });
          state.isReg = false;
        });
      }
      const __returned__ = { state, rules, login, afterLogin, checkToken, getCheckCode, register, reactive: vue.reactive, ref: vue.ref, onMounted: vue.onMounted, onBeforeMount: vue.onBeforeMount, get GetCheckCode() {
        return GetCheckCode;
      }, get Login() {
        return Login;
      }, get CheckCodeLogin() {
        return CheckCodeLogin;
      }, get Register() {
        return Register;
      }, get VerifyToken() {
        return VerifyToken;
      }, get formDataAuth() {
        return formDataAuth;
      }, get auth() {
        return auth;
      }, get user() {
        return user;
      }, get delayToRun() {
        return delayToRun;
      }, get loading() {
        return loading;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_1$5);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$4);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2$2);
    return !$setup.state.hasLogan ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      id: "login"
    }, [
      vue.createVNode(_component_uni_forms, {
        "label-position": "right",
        rules: $setup.rules,
        "label-align": "right"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            label: "电子邮箱",
            name: "email",
            class: "item"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "email",
                modelValue: $setup.state.email,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.state.email = $event),
                maxlength: "25"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          !$setup.state.useCheckCode || $setup.state.isReg ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
            key: 0,
            name: "password",
            label: "密码",
            maxlength: "20",
            class: "item"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "password",
                modelValue: $setup.state.password,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.state.password = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          })) : vue.createCommentVNode("v-if", true),
          $setup.state.useCheckCode || $setup.state.isReg ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
            key: 1,
            label: "验证码",
            class: "item",
            name: "checkCode"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "check" }, [
                vue.createVNode(_component_uni_easyinput, {
                  type: "text",
                  modelValue: $setup.state.checkCode,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.state.checkCode = $event),
                  maxlength: $setup.state.checkCodeLen,
                  class: "check-code"
                }, null, 8, ["modelValue", "maxlength"]),
                vue.createElementVNode("button", {
                  size: "mini",
                  class: "get-check-code",
                  onClick: $setup.getCheckCode,
                  disabled: $setup.state.hasGotCode
                }, vue.toDisplayString($setup.state.checkCodeText), 9, ["disabled"])
              ])
            ]),
            _: 1
            /* STABLE */
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "btns" }, [
            !$setup.state.isReg ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              type: "primary",
              onClick: $setup.login,
              class: "btn",
              size: "mini"
            }, "登录")) : (vue.openBlock(), vue.createElementBlock("button", {
              key: 1,
              type: "primary",
              onClick: $setup.register,
              class: "btn",
              size: "mini"
            }, "注册"))
          ]),
          vue.createElementVNode("view", { class: "login-opt" }, [
            !$setup.state.useCheckCode ? (vue.openBlock(), vue.createElementBlock("a", {
              key: 0,
              onClick: _cache[3] || (_cache[3] = ($event) => {
                $setup.state.useCheckCode = true;
                $setup.state.isReg = false;
                $setup.state.checkCodeLen = 4;
              })
            }, "使用验证码登录")) : (vue.openBlock(), vue.createElementBlock("a", {
              key: 1,
              onClick: _cache[4] || (_cache[4] = ($event) => {
                $setup.state.useCheckCode = false;
                $setup.state.isReg = false;
              })
            }, "使用密码登录")),
            !$setup.state.isReg ? (vue.openBlock(), vue.createElementBlock("a", {
              key: 2,
              onClick: _cache[5] || (_cache[5] = ($event) => {
                $setup.state.isReg = true;
                $setup.state.checkCodeLen = 6;
              })
            }, "注册")) : (vue.openBlock(), vue.createElementBlock("a", {
              key: 3,
              onClick: _cache[6] || (_cache[6] = ($event) => {
                $setup.state.isReg = false;
                $setup.state.checkCodeLen = 6;
              })
            }, "注册"))
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["rules"])
    ])) : (vue.openBlock(), vue.createElementBlock("cover-image", {
      key: 1,
      src: _imports_0$3
    }));
  }
  const PagesLogin = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-e8ce220f"], ["__file", "D:/repos/html+css+js/SelfSchedule/pages/login.vue"]]);
  let mpMixins = {};
  mpMixins = {
    data() {
      return {
        is_show: "none"
      };
    },
    watch: {
      show(newVal) {
        this.is_show = this.show;
      }
    },
    created() {
      this.swipeaction = this.getSwipeAction();
      if (this.swipeaction && Array.isArray(this.swipeaction.children)) {
        this.swipeaction.children.push(this);
      }
    },
    mounted() {
      this.is_show = this.show;
    },
    methods: {
      // wxs 中调用
      closeSwipe(e2) {
        if (this.autoClose && this.swipeaction) {
          this.swipeaction.closeOther(this);
        }
      },
      change(e2) {
        this.$emit("change", e2.open);
        if (this.is_show !== e2.open) {
          this.is_show = e2.open;
        }
      },
      appTouchStart(e2) {
        const {
          clientX
        } = e2.changedTouches[0];
        this.clientX = clientX;
        this.timestamp = (/* @__PURE__ */ new Date()).getTime();
      },
      appTouchEnd(e2, index, item, position) {
        const {
          clientX
        } = e2.changedTouches[0];
        let diff = Math.abs(this.clientX - clientX);
        let time = (/* @__PURE__ */ new Date()).getTime() - this.timestamp;
        if (diff < 40 && time < 300) {
          this.$emit("click", {
            content: item,
            index,
            position
          });
        }
      },
      onClickForPC(index, item, position) {
        return;
      }
    }
  };
  const mpwxs = mpMixins;
  let bindIngXMixins = {};
  let otherMixins = {};
  const block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("wxsswipe");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["wxsswipe"] = "afd46426";
  };
  const block1 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("renderswipe");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["renderswipe"] = "5a1e922e";
  };
  const _sfc_main$p = {
    mixins: [mpwxs, bindIngXMixins, otherMixins],
    emits: ["click", "change"],
    props: {
      // 控制开关
      show: {
        type: String,
        default: "none"
      },
      // 禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否自动关闭
      autoClose: {
        type: Boolean,
        default: true
      },
      // 滑动缺省距离
      threshold: {
        type: Number,
        default: 20
      },
      // 左侧按钮内容
      leftOptions: {
        type: Array,
        default() {
          return [];
        }
      },
      // 右侧按钮内容
      rightOptions: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    methods: {
      uninstall() {
        if (this.swipeaction) {
          this.swipeaction.children.forEach((item, index) => {
            if (item === this) {
              this.swipeaction.children.splice(index, 1);
            }
          });
        }
      },
      /**
       * 获取父元素实例
       */
      getSwipeAction(name = "uniSwipeAction") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 在微信小程序 app vue端 h5 使用wxs 实现"),
        vue.createElementVNode("view", { class: "uni-swipe" }, [
          vue.createElementVNode("view", {
            class: "uni-swipe_box",
            "change:prop": _ctx.wxsswipe.showWatch,
            prop: vue.wp(_ctx.is_show),
            "data-threshold": $props.threshold,
            "data-disabled": $props.disabled,
            onTouchstart: _cache[2] || (_cache[2] = (...args) => _ctx.wxsswipe.touchstart && _ctx.wxsswipe.touchstart(...args)),
            onTouchmove: _cache[3] || (_cache[3] = (...args) => _ctx.wxsswipe.touchmove && _ctx.wxsswipe.touchmove(...args)),
            onTouchend: _cache[4] || (_cache[4] = (...args) => _ctx.wxsswipe.touchend && _ctx.wxsswipe.touchend(...args))
          }, [
            vue.createCommentVNode(" 在微信小程序 app vue端 h5 使用wxs 实现"),
            vue.createElementVNode("view", { class: "uni-swipe_button-group button-group--left" }, [
              vue.renderSlot(_ctx.$slots, "left", {}, () => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.leftOptions, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      style: vue.normalizeStyle({
                        backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD"
                      }),
                      class: "uni-swipe_button button-hock",
                      onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args), ["stop"])),
                      onTouchend: vue.withModifiers(($event) => _ctx.appTouchEnd($event, index, item, "left"), ["stop"]),
                      onClick: vue.withModifiers(($event) => _ctx.onClickForPC(index, item, "left"), ["stop"])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-swipe_button-text",
                          style: vue.normalizeStyle({ color: item.style && item.style.color ? item.style.color : "#FFFFFF", fontSize: item.style && item.style.fontSize ? item.style.fontSize : "16px" })
                        },
                        vue.toDisplayString(item.text),
                        5
                        /* TEXT, STYLE */
                      )
                    ], 44, ["onTouchend", "onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], true)
            ]),
            vue.createElementVNode("view", { class: "uni-swipe_text--center" }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ]),
            vue.createElementVNode("view", { class: "uni-swipe_button-group button-group--right" }, [
              vue.renderSlot(_ctx.$slots, "right", {}, () => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.rightOptions, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      style: vue.normalizeStyle({
                        backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD"
                      }),
                      class: "uni-swipe_button button-hock",
                      onTouchstart: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args), ["stop"])),
                      onTouchend: vue.withModifiers(($event) => _ctx.appTouchEnd($event, index, item, "right"), ["stop"]),
                      onClick: vue.withModifiers(($event) => _ctx.onClickForPC(index, item, "right"), ["stop"])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-swipe_button-text",
                          style: vue.normalizeStyle({ color: item.style && item.style.color ? item.style.color : "#FFFFFF", fontSize: item.style && item.style.fontSize ? item.style.fontSize : "16px" })
                        },
                        vue.toDisplayString(item.text),
                        5
                        /* TEXT, STYLE */
                      )
                    ], 44, ["onTouchend", "onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], true)
            ])
          ], 40, ["change:prop", "prop", "data-threshold", "data-disabled"])
        ]),
        vue.createCommentVNode(" app nvue端 使用 bindingx "),
        vue.createCommentVNode(" 其他平台使用 js ，长列表性能可能会有影响")
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  if (typeof block0 === "function")
    block0(_sfc_main$p);
  if (typeof block1 === "function")
    block1(_sfc_main$p);
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-8ff2a577"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue"]]);
  const _sfc_main$o = {
    name: "uniSwipeAction",
    data() {
      return {};
    },
    created() {
      this.children = [];
    },
    methods: {
      // 公开给用户使用，重制组件样式
      resize() {
      },
      // 公开给用户使用，关闭全部 已经打开的组件
      closeAll() {
        this.children.forEach((vm) => {
          vm.is_show = "none";
        });
      },
      closeOther(vm) {
        if (this.openItem && this.openItem !== vm) {
          this.openItem.is_show = "none";
        }
        this.openItem = vm;
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue"]]);
  const _sfc_main$n = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w2 = this.width / 2, h2 = 10;
        if (this.isDot) {
          w2 = 5;
          h2 = 5;
        }
        const x = `${-w2 + this.offset[0]}px`;
        const y2 = `${-h2 + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y2
          },
          rightBottom: {
            right: x,
            bottom: y2
          },
          leftBottom: {
            left: x,
            bottom: y2
          },
          leftTop: {
            left: x,
            top: y2
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-c97cb896"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$m = {
    name: "UniListItem",
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      badgeText: {
        type: String,
        default: ""
      },
      badgeType: {
        type: String,
        default: "success"
      },
      badgeStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            type: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (typeof padding == "number") {
            padding += "";
          }
          let paddingArr = padding.split(" ");
          if (paddingArr.length === 1) {
            const allPadding = paddingArr[0];
            this.padding = {
              "top": allPadding,
              "right": allPadding,
              "bottom": allPadding,
              "left": allPadding
            };
          } else if (paddingArr.length === 2) {
            const [verticalPadding, horizontalPadding] = paddingArr;
            this.padding = {
              "top": verticalPadding,
              "right": horizontalPadding,
              "bottom": verticalPadding,
              "left": horizontalPadding
            };
          } else if (paddingArr.length === 4) {
            const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
            this.padding = {
              "top": topPadding,
              "right": rightPadding,
              "bottom": bottomPadding,
              "left": leftPadding
            };
          }
        },
        immediate: true
      }
    },
    // inject: ['list'],
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        }
      };
    },
    mounted() {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e2) {
        this.$emit("switchChange", e2.detail);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      style: vue.normalizeStyle({ "background-color": $props.customStyle.backgroundColor }),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uni-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }]),
          style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
        },
        [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            vue.createElementVNode("view", { class: "uni-list-item__header" }, [
              $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-list-item__icon"
              }, [
                vue.createElementVNode("image", {
                  src: $props.thumb,
                  class: vue.normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
                }, null, 10, ["src"])
              ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-list-item__icon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  customPrefix: $props.extraIcon.customPrefix,
                  color: $props.extraIcon.color,
                  size: $props.extraIcon.size,
                  type: $props.extraIcon.type
                }, null, 8, ["customPrefix", "color", "size", "type"])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ], true),
          vue.renderSlot(_ctx.$slots, "body", {}, () => [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
              },
              [
                $props.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
                  },
                  vue.toDisplayString($props.title),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true),
                $props.note ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: "uni-list-item__content-note"
                  },
                  vue.toDisplayString($props.note),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], true),
          vue.renderSlot(_ctx.$slots, "footer", {}, () => [
            $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
              },
              [
                $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-list-item__extra-text"
                  },
                  vue.toDisplayString($props.rightText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uni_badge, {
                  key: 1,
                  type: $props.badgeType,
                  text: $props.badgeText,
                  "custom-style": $props.badgeStyle
                }, null, 8, ["type", "text", "custom-style"])) : vue.createCommentVNode("v-if", true),
                $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("switch", {
                  key: 2,
                  disabled: $props.disabled,
                  checked: $props.switchChecked,
                  onChange: _cache[0] || (_cache[0] = (...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
                }, null, 40, ["disabled", "checked"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true)
        ],
        6
        /* CLASS, STYLE */
      ),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-c7524739"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
  const _sfc_main$l = {
    name: "uniList",
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      stackFromEnd: {
        type: Boolean,
        default: false
      },
      enableBackToTop: {
        type: [Boolean, String],
        default: false
      },
      scrollY: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      renderReverse: {
        type: Boolean,
        default: false
      }
    },
    // provide() {
    // 	return {
    // 		list: this
    // 	};
    // },
    created() {
      this.firstChildAppend = false;
    },
    methods: {
      loadMore(e2) {
        this.$emit("scrolltolower");
      },
      scroll(e2) {
        this.$emit("scroll", e2);
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-list uni-border-top-bottom" }, [
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-list--border-top"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-list--border-bottom"
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__scopeId", "data-v-c2f1266a"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$k = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode2) => {
          if (mode2 === "fade") {
            styles.opacity = this.animationType(type2)[mode2];
          } else {
            styles.transform += this.animationType(type2)[mode2] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode2) => {
            buildStyle(type, mode2);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode2) => {
          let aniNum = null;
          if (mode2 === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode2 === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode2 === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode2 === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode2 === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode2]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode2) => {
            buildTranfrom(type, mode2);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$j = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e2) {
        e2.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:298", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-4dd3c44b"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  let platform$1 = "other";
  const _sfc_main$i = {
    name: "UniFab",
    emits: ["fabClick", "trigger"],
    props: {
      pattern: {
        type: Object,
        default() {
          return {};
        }
      },
      horizontal: {
        type: String,
        default: "left"
      },
      vertical: {
        type: String,
        default: "bottom"
      },
      direction: {
        type: String,
        default: "horizontal"
      },
      content: {
        type: Array,
        default() {
          return [];
        }
      },
      show: {
        type: Boolean,
        default: false
      },
      popMenu: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        fabShow: false,
        isShow: false,
        isAndroidNvue: platform$1 === "android",
        styles: {
          color: "#3c3e49",
          selectedColor: "#007AFF",
          backgroundColor: "#fff",
          buttonColor: "#007AFF",
          iconColor: "#fff",
          icon: "plusempty"
        }
      };
    },
    computed: {
      contentWidth(e2) {
        return (this.content.length + 1) * 55 + 15 + "px";
      },
      contentWidthMin() {
        return "55px";
      },
      // 动态计算宽度
      boxWidth() {
        return this.getPosition(3, "horizontal");
      },
      // 动态计算高度
      boxHeight() {
        return this.getPosition(3, "vertical");
      },
      // 计算左下位置
      leftBottom() {
        return this.getPosition(0, "left", "bottom");
      },
      // 计算右下位置
      rightBottom() {
        return this.getPosition(0, "right", "bottom");
      },
      // 计算左上位置
      leftTop() {
        return this.getPosition(0, "left", "top");
      },
      rightTop() {
        return this.getPosition(0, "right", "top");
      },
      flexDirectionStart() {
        return this.getPosition(1, "vertical", "top");
      },
      flexDirectionEnd() {
        return this.getPosition(1, "vertical", "bottom");
      },
      horizontalLeft() {
        return this.getPosition(2, "horizontal", "left");
      },
      horizontalRight() {
        return this.getPosition(2, "horizontal", "right");
      },
      // 计算 nvue bottom
      nvueBottom() {
        uni.getSystemInfoSync().windowBottom;
        return 30;
      }
    },
    watch: {
      pattern: {
        handler(val, oldVal) {
          this.styles = Object.assign({}, this.styles, val);
        },
        deep: true
      }
    },
    created() {
      this.isShow = this.show;
      if (this.top === 0) {
        this.fabShow = true;
      }
      this.styles = Object.assign({}, this.styles, this.pattern);
    },
    methods: {
      _onClick() {
        this.$emit("fabClick");
        if (!this.popMenu) {
          return;
        }
        this.isShow = !this.isShow;
      },
      open() {
        this.isShow = true;
      },
      close() {
        this.isShow = false;
      },
      /**
       * 按钮点击事件
       */
      _onItemClick(index, item) {
        if (!this.isShow) {
          return;
        }
        this.$emit("trigger", {
          index,
          item
        });
      },
      /**
       * 获取 位置信息
       */
      getPosition(types2, paramA, paramB) {
        if (types2 === 0) {
          return this.horizontal === paramA && this.vertical === paramB;
        } else if (types2 === 1) {
          return this.direction === paramA && this.vertical === paramB;
        } else if (types2 === 2) {
          return this.direction === paramA && this.horizontal === paramB;
        } else {
          return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
        }
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-cursor-point" }, [
      $props.popMenu && ($options.leftBottom || $options.rightBottom || $options.leftTop || $options.rightTop) && $props.content.length > 0 ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass([{
            "uni-fab--leftBottom": $options.leftBottom,
            "uni-fab--rightBottom": $options.rightBottom,
            "uni-fab--leftTop": $options.leftTop,
            "uni-fab--rightTop": $options.rightTop
          }, "uni-fab"]),
          style: vue.normalizeStyle($options.nvueBottom)
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass([{
                "uni-fab__content--left": $props.horizontal === "left",
                "uni-fab__content--right": $props.horizontal === "right",
                "uni-fab__content--flexDirection": $props.direction === "vertical",
                "uni-fab__content--flexDirectionStart": $options.flexDirectionStart,
                "uni-fab__content--flexDirectionEnd": $options.flexDirectionEnd,
                "uni-fab__content--other-platform": !$data.isAndroidNvue
              }, "uni-fab__content"]),
              style: vue.normalizeStyle({ width: $options.boxWidth, height: $options.boxHeight, backgroundColor: $data.styles.backgroundColor }),
              elevation: "5"
            },
            [
              $options.flexDirectionStart || $options.horizontalLeft ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-fab__item uni-fab__item--first"
              })) : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.content, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: vue.normalizeClass([{ "uni-fab__item--active": $data.isShow }, "uni-fab__item"]),
                    onClick: ($event) => $options._onItemClick(index, item)
                  }, [
                    vue.createElementVNode("image", {
                      src: item.active ? item.selectedIconPath : item.iconPath,
                      class: "uni-fab__item-image",
                      mode: "aspectFit"
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: "uni-fab__item-text",
                        style: vue.normalizeStyle({ color: item.active ? $data.styles.selectedColor : $data.styles.color })
                      },
                      vue.toDisplayString(item.text),
                      5
                      /* TEXT, STYLE */
                    )
                  ], 10, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              $options.flexDirectionEnd || $options.horizontalRight ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-fab__item uni-fab__item--first"
              })) : vue.createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass([{
            "uni-fab__circle--leftBottom": $options.leftBottom,
            "uni-fab__circle--rightBottom": $options.rightBottom,
            "uni-fab__circle--leftTop": $options.leftTop,
            "uni-fab__circle--rightTop": $options.rightTop,
            "uni-fab__content--other-platform": !$data.isAndroidNvue
          }, "uni-fab__circle uni-fab__plus"]),
          style: vue.normalizeStyle({ "background-color": $data.styles.buttonColor, "bottom": $options.nvueBottom }),
          onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
        },
        [
          vue.createVNode(_component_uni_icons, {
            class: vue.normalizeClass(["fab-circle-icon", { "uni-fab__plus--active": $data.isShow && $props.content.length > 0 }]),
            type: $data.styles.icon,
            color: $data.styles.iconColor,
            size: "32"
          }, null, 8, ["type", "color", "class"]),
          vue.createCommentVNode(` <view class="fab-circle-v"  :class="{'uni-fab__plus--active': isShow && content.length > 0}"></view>\r
			<view class="fab-circle-h" :class="{'uni-fab__plus--active': isShow  && content.length > 0}"></view> `)
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-85f34dfc"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-fab/components/uni-fab/uni-fab.vue"]]);
  function CreateTask(task, successCallback) {
    Put("/Api/Task/CreateTask", auth, task, successCallback);
    uni.removeStorageSync(TaskReminderKey);
  }
  function GetTaskReminders(taskId, successCallback) {
    Get(`/Api/Task/GetTaskReminders/${taskId}`, auth, successCallback);
  }
  function GetTasks$1(pageOption, userId, time, successCallback) {
    Get(
      `/Api/Task/GetTasks/${userId}?page=${pageOption.current}&pageSize=${pageOption.size}&time=${time.getTime()}`,
      auth,
      successCallback
    );
  }
  function CancelTask(task, mode2, successCallback) {
    Post(`/Api/Task/CancelTask?mode=${mode2}`, auth, task, successCallback);
  }
  function AddReminder(reminder, mode2, successCallback) {
    Put(`/Api/Task/AddReminder?mode=${mode2}`, auth, reminder, successCallback);
  }
  function RemoveReminder(reminder, mode2, successCallback) {
    Put(`/Api/Task/RemoveReminder?mode=${mode2}`, auth, reminder, successCallback);
  }
  function ChangeRepeatRule(rule, mode2, successCallback) {
    Patch(`/Api/Task/ChangeRepeatRule?mode=${mode2}`, auth, rule, successCallback);
  }
  function UpdateTask$1(newTask, mode2, successCallback) {
    Post(`/Api/Task/UpdateTask?mode=${mode2}`, auth, newTask, successCallback);
  }
  function FinishOrNot$1(taskId, state, successCallback) {
    Patch(`/Api/Task/FinishOrNot/${taskId}?state=${state}`, auth, {}, successCallback);
  }
  function GetCurrentTaskReminders(userId, currentTime, successCallback) {
    Get(`/Api/Task/GetCurrentTaskReminders/${userId}?currentTime=${currentTime.getTime()}`, auth, successCallback);
  }
  function FreshReminderTiming(taskId, taskBeginTime, successCallback) {
    Post(`/Api/Task/FreshReminderTiming/${taskId}?taskBeginTime=${taskBeginTime.getTime()}`, auth, {}, successCallback);
  }
  function FinishTask(taskId) {
    FinishOrNot$1(taskId, TaskState.finished, (response) => {
      if (!response.data.succeeded) {
        uni.showToast({
          title: response.data.message,
          icon: "none"
        });
        return;
      }
      const route = getCurrentPages()[0].route;
      uni.reLaunch({
        url: "/" + route
      });
    });
  }
  const _imports_5 = "/static/闪电.png";
  const _sfc_main$h = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const popup = vue.ref(null);
      const frequencyPopup = vue.ref(null);
      const defRulePopup = vue.ref(null);
      const detailPopup = vue.ref(null);
      const priorityPopup = vue.ref(null);
      const customPopup = vue.ref(null);
      const editModePopup = vue.ref(null);
      const today2 = vue.ref(/* @__PURE__ */ new Date());
      const taskPageOpt = vue.ref(new PageOption(1, 100, 0));
      const pattern2 = vue.ref({
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      });
      const state = vue.reactive({
        showWay: CalendarDisplayWay.week,
        canCreateTask: false,
        task: {
          title: "",
          description: "",
          beginTime: "",
          endTime: "",
          priority: 4,
          reminderInfoModels: [],
          period: 0,
          periodUnit: 0,
          changed: function() {
            return this.title.length > 0 || this.description.length > 0 || this.priority != 4;
          },
          custom: null,
          deadline: null,
          count: 0,
          userId: user.uid,
          repeatable: false
        },
        startTime: {
          date: "",
          time: ""
        },
        endTime: {
          date: "",
          time: ""
        },
        allday: false,
        priority,
        frequency: {
          data: frequency,
          multiData: [],
          selectedOne: [],
          defText: "不重复",
          selection: 0
        },
        manualPopup: false,
        notifications: [],
        notifyIntervals: [],
        notifyOpt: [
          [],
          ["分", "时", "天", "周", "月"]
        ],
        weekdays,
        defOpt: {
          data: [new ValueText(0, "一直"), new ValueText(1, "截止到"), new ValueText(2, "重复")],
          val: 0,
          modal: void 0,
          mode: "一直",
          text: ""
        },
        selectedDay: new Date(today2.value),
        selectedTask: null,
        mode: 0,
        modeContent: [],
        isTaskUpdate: false,
        isTaskCancel: false
      });
      vue.onMounted(function() {
        state.startTime.date = getDateStr(today2.value);
        state.startTime.time = timeWithoutSeconds(today2.value);
        if (user == "")
          state.task.userId = uni.getStorageSync("user").uid;
        else
          state.task.userId = user.uid;
        const date = new Date(today2.value);
        date.setHours(date.getHours() + 1);
        state.endTime.date = getDateStr(date);
        state.endTime.time = timeWithoutSeconds(date);
        const numbers = [];
        for (let i2 = 1; i2 <= 99; i2++)
          numbers.push(i2);
        state.frequency.multiData.push(numbers);
        state.frequency.multiData.push(["天", "周", "月", "年"]);
        const counts = [];
        for (let i2 = 1; i2 <= 1e3; i2++)
          counts.push(i2);
        state.frequency.multiData.push(counts);
        state.notifyOpt[0] = remindModeValues(1);
        state.task.beginTime = new Date(today2.value);
        state.task.endTime = date;
        state.modeContent = [
          new ValueText(0, "全部重复任务"),
          new ValueText(1, "仅此任务"),
          new ValueText(2, "此任务及往后的任务")
        ];
        getData();
      });
      function openToEdit() {
        popup.value.open();
      }
      function modeChange(way) {
        state.showWay = way;
      }
      function beforeClosePopup(e2) {
        if (e2.show || state.manualPopup)
          return;
        popupClose(e2);
      }
      function closePopup() {
        state.manualPopup = true;
        popupClose({
          show: true
        });
      }
      function popupClose(e2) {
        if (state.task.changed()) {
          uni.showModal({
            title: "撤销编辑内容",
            content: "已编辑的内容未使用，是否继续编辑？",
            confirmText: "放弃",
            cancelText: "继续",
            success: (res) => {
              if (!res.confirm)
                return;
              popup.value.close();
              reloadTaskModel();
            }
          });
        } else {
          if (e2.show) {
            popup.value.close();
            reloadTaskModel();
          }
        }
      }
      function reloadTaskModel() {
        for (let pro in state.task) {
          if (pro == "changed")
            continue;
          if (pro != "priority")
            state.task[pro] = "";
          else
            state.task[pro] = 4;
        }
        const temp = new Date(state.selectedDay);
        state.startTime.date = getDateStr(temp);
        state.startTime.time = timeWithoutSeconds(temp);
        const date = new Date(temp.setHours(temp.getHours() + 1));
        state.endTime.date = getDateStr(date);
        state.endTime.time = timeWithoutSeconds(date);
        state.task.beginTime = /* @__PURE__ */ new Date(state.startTime.date + " " + state.startTime.time);
        state.task.endTime = /* @__PURE__ */ new Date(state.endTime.date + " " + state.endTime.time);
        state.task.custom = null;
        state.task.deadline = null;
        state.frequency.defText = "不重复";
        state.frequency.selection = 0;
        state.defOpt.mode = "一直";
        state.defOpt.val = 0;
        state.task.period = 1;
        state.task.periodUnit = 1;
        state.task.count = 0;
        state.task.reminderInfoModels = [];
        state.task.userId = user == "" ? uni.getStorageSync("user").uid : user.uid;
        state.manualPopup = false;
        state.canCreateTask = false;
        state.isTaskUpdate = false;
        state.task.repeatable = false;
        if (state.task.changed == void 0)
          state.task.changed = function() {
            return this.title.length > 0 || this.description.length > 0 || this.priority != 3;
          };
      }
      function pick(event, sign) {
        const detail = event.detail;
        const modified = detail.value.replace(/-/g, "/");
        switch (sign) {
          case "begin-date":
            state.startTime.date = modified;
            break;
          case "begin-time":
            state.startTime.time = modified;
            break;
          case "end-date":
            state.endTime.date = modified;
            break;
          case "end-time":
            state.endTime.time = modified;
            break;
        }
        state.task.beginTime = /* @__PURE__ */ new Date(state.startTime.date + " " + state.startTime.time);
        state.task.endTime = /* @__PURE__ */ new Date(state.endTime.date + " " + state.endTime.time);
        if (state.task.beginTime.getTime() >= state.task.endTime.getTime()) {
          state.task.endTime = new Date(state.task.beginTime);
          state.task.endTime.setHours(state.task.endTime.getHours() + 1);
          state.endTime.date = getDateStr(state.task.endTime);
          state.endTime.time = timeWithoutSeconds(state.task.endTime);
        }
      }
      function allDay() {
        state.allday = !state.allday;
        if (state.allday) {
          state.endTime.time = "23:59";
          state.task.endTime = /* @__PURE__ */ new Date(state.endTime.date + " " + state.endTime.time);
          state.task.endTime.setSeconds(59);
        } else {
          const date = /* @__PURE__ */ new Date(state.startTime.date + " " + state.startTime.time);
          date.setHours(date.getHours() + 1);
          state.endTime.time = timeWithoutSeconds(date);
          state.task.endTime = date;
        }
      }
      function seeTaskDetail(index) {
        state.task.changed = () => false;
        const task = taskPageOpt.value.data[index];
        GetTaskReminders(task.instanceId, (response) => {
          const res = response.data;
          if (res.succeeded) {
            state.selectedTask = task;
            const notifications = res.data;
            for (let datum of notifications)
              datum.timing = new Date(datum.timing);
            state.selectedTask.reminderInfoModels = notifications;
            state.selectedTask.index = index;
            state.startTime.date = getDateStr(task.beginTime);
            state.startTime.time = timeWithoutSeconds(task.beginTime);
            state.endTime.date = getDateStr(task.endTime);
            state.endTime.time = timeWithoutSeconds(task.endTime);
            if (task.repeatable) {
              state.frequency.selection = task.custom == null ? state.selectedTask.periodUnit : 5;
              state.frequency.defText = task.custom != null || state.selectedTask.period > 1 ? "自定义" : frequency[state.selectedTask.periodUnit].text;
            }
            detailPopup.value.open();
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      }
      function titleInput() {
        if (state.isTaskUpdate)
          return;
        state.canCreateTask = state.task.title.length > 0;
      }
      function editTask() {
        if (!state.isTaskUpdate) {
          if (!state.task.changed() || !state.canCreateTask)
            return;
          state.task.beginTime;
          CreateTask(state.task, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
            } else {
              const expire = 500;
              uni.showLoading({
                title: res.message,
                duration: expire
              });
              delayToRun(() => {
                uni.hideLoading();
                state.manualPopup = true;
                popup.value.close();
                if (taskPageOpt.value.data.length < taskPageOpt.value.size) {
                  const task = {};
                  copy(state.task, task);
                  task.taskId = res.data;
                  task.instanceId = res.data;
                  taskPageOpt.value.data.push(task);
                }
                taskPageOpt.value.total++;
                reloadTaskModel();
                uni.removeStorageSync(TaskReminderKey$1);
              }, expire);
            }
          });
        } else {
          if (state.task.changed())
            updateTask();
          else
            popup.value.close();
        }
      }
      function multiSelect(e2) {
        const detail = e2.detail;
        state.defOpt.text = "每" + state.frequency.multiData[0][detail.value[0]] + state.frequency.multiData[1][detail.value[1]];
        state.task.period = state.frequency.multiData[0][detail.value[0]];
        state.task.periodUnit = detail.value[1] + 1;
      }
      function addReminderInfoModel(e2) {
        const detail = e2.detail;
        const indexes = detail.value;
        const mode2 = indexes[1] + 1;
        const value = state.notifyOpt[0][indexes[0]];
        const instance = ReminderInfo.getInstance(mode2, value, state.task.beginTime);
        const data = state.task.reminderInfoModels;
        const func = () => {
          if (data.length == 0)
            data.push(instance);
          else {
            for (let i2 = 0; i2 < data.length; i2++) {
              if (instance.timing.getTime() < data[i2].timing.getTime()) {
                if (data.findIndex((e3) => e3.timing == instance.timing) < 0)
                  data.splice(i2, 0, instance);
                break;
              }
            }
          }
        };
        if (state.isTaskUpdate) {
          instance.taskId = state.selectedTask.taskId;
          instance.instanceId = state.selectedTask.instanceId;
          if (state.selectedTask.taskId == state.selectedTask.instanceId && state.mode == 1)
            state.mode = 0;
          instance.taskBeginTime = state.selectedTask.beginTime;
          AddReminder(instance, state.mode, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
            } else {
              instance.reminderId = res.data;
              func();
              uni.removeStorageSync(TaskReminderKey$1);
            }
          });
        } else
          func();
      }
      function changeNotifyMode(e2) {
        const detail = e2.detail;
        if (detail.column == 1) {
          state.notifyOpt[0] = remindModeValues(detail.value + 1);
        }
      }
      function notify(e2) {
        const value = e2.value;
        if (state.isTaskUpdate && value == 0) {
          frequencyPopup.value.close();
          return;
        }
        if (value < state.frequency.data.length) {
          state.task.repeatable = value > 0;
          state.task.period = 1;
          state.task.periodUnit = value;
          state.frequency.defText = state.frequency.data[value].text;
        } else {
          state.task.repeatable = true;
          state.frequency.defText = "自定义";
          state.task.period = 1;
          state.task.periodUnit = 1;
          state.defOpt.text = `每${1}日`;
          defRulePopup.value.open();
        }
        frequencyPopup.value.close();
      }
      function takeCustom(e2) {
        const data = e2.value;
        state.task.custom = /* @__PURE__ */ new Map();
        for (let value of data) {
          const item = state.weekdays[value];
          state.task.custom[item.key] = item.value;
        }
      }
      function takeCustomMode(e2) {
        const value = e2.value;
        state.defOpt.mode = state.defOpt.data[value].text;
        customPopup.value.close();
      }
      function takeCount(e2) {
        state.task.count = e2.detail.value + 1;
      }
      function takeDeadline(e2) {
        const date = new Date(e2.detail.value);
        state.task.deadline = date;
        if (date.getTime() <= state.task.beginTime.getTime() || date.getTime() > state.task.beginTime.getTime() && date.getTime() < state.task.endTime.getTime()) {
          uni.showToast({
            title: "选择的截止时间应大于开始和结束时间",
            icon: "none"
          });
        }
      }
      function dateChange(date) {
        state.selectedDay = date;
        getData();
      }
      function getData() {
        GetTasks$1(taskPageOpt.value, state.task.userId, state.selectedDay, getDataCallback);
      }
      function getDataCallback(response) {
        const res = response.data;
        if (!res.succeeded) {
          uni.showToast({
            title: res.message,
            icon: "none"
          });
        } else {
          loading("", () => {
            taskPageOpt.value.data = res.data.data;
            taskPageOpt.value.total = res.data.total;
            for (let task of taskPageOpt.value.data) {
              task.beginTime = new Date(task.beginTime);
              task.endTime = new Date(task.endTime);
              if (!dateEquals(state.selectedDay, today2.value) && task.deadline != null) {
                task.deadline = new Date(task.deadline);
              }
            }
            uni.removeStorageSync(TaskReminderKey$1);
          }, 750);
        }
      }
      function updateTask() {
        FreshReminderTiming(state.selectedTask.instanceId, state.task.beginTime, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          state.task.instanceId = state.selectedTask.instanceId;
          state.task.taskId = state.selectedTask.taskId;
          state.task.repeatable = state.selectedTask.repeatable;
          if (state.task.title.length == 0)
            state.task.title = state.selectedTask.title;
          UpdateTask$1(state.task, state.mode, (response1) => {
            const res1 = response1.data;
            if (!res1.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
            } else {
              for (let pro in state.task)
                state.selectedTask[pro] = state.task[pro];
              loading("", () => {
                popup.value.close();
                detailPopup.value.close();
                uni.removeStorageSync(TaskReminderKey$1);
              }, 500);
            }
          });
        });
      }
      function closeDetailPopup() {
        detailPopup.value.close();
      }
      function removeReminder(index) {
        const reminder = state.task.reminderInfoModels[index];
        if (!state.isTaskUpdate) {
          state.task.reminderInfoModels.splice(index, 1);
        } else {
          reminder.taskId = state.selectedTask.taskId;
          reminder.instanceId = state.selectedTask.instanceId;
          reminder.taskBeginTime = state.selectedTask.beginTime;
          if (state.selectedTask.taskId == state.selectedTask.instanceId && state.mode == 1)
            state.mode = 0;
          RemoveReminder(reminder, state.mode, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
            } else {
              state.task.reminderInfoModels.splice(index, 1);
              uni.removeStorageSync(TaskReminderKey$1);
            }
          });
        }
      }
      function openEditOrCancelTask() {
        if (state.isTaskCancel) {
          CancelTask(state.selectedTask, state.mode, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
            } else {
              state.isTaskCancel = false;
              taskPageOpt.value.data.splice(state.selectedTask.index, 1);
              editModePopup.value.close();
              detailPopup.value.close();
            }
          });
          return;
        }
        copy(state.selectedTask, state.task);
        state.startTime.date = getDateStr(state.task.beginTime);
        state.startTime.time = timeWithoutSeconds(state.task.beginTime);
        state.endTime.date = getDateStr(state.task.endTime);
        state.endTime.time = timeWithoutSeconds(state.task.endTime);
        state.task.changed = () => {
          return state.task.title != state.selectedTask.title || state.task.description != state.selectedTask.description || state.task.priority != state.selectedTask.priority || state.task.beginTime.getTime() != state.selectedTask.beginTime.getTime() || state.task.endTime.getTime() != state.selectedTask.endTime.getTime();
        };
        state.isTaskUpdate = true;
        state.canCreateTask = true;
        openToEdit();
        editModePopup.value.close();
      }
      function openEditUI() {
        if (!state.selectedTask.repeatable) {
          copy(state.selectedTask, state.task);
          state.task.changed = () => {
            return state.task.title != state.selectedTask.title || state.task.description != state.selectedTask.description || state.task.priority != state.selectedTask.priority || state.task.beginTime != state.selectedTask.beginTime || state.task.endTime != state.selectedTask.endTime;
          };
          state.isTaskUpdate = true;
          state.canCreateTask = true;
          openToEdit();
        } else {
          if (state.selectedTask.taskId == state.selectedTask.instanceId)
            state.modeContent = [new ValueText(0, "全部重复任务"), new ValueText(1, "仅此任务")];
          else
            state.modeContent = [
              new ValueText(0, "全部重复任务"),
              new ValueText(1, "仅此任务"),
              new ValueText(2, "此任务及往后的任务")
            ];
          editModePopup.value.open();
        }
      }
      function beginEndTimeStr(task) {
        const beginTime = task.beginTime;
        const endTime = task.endTime;
        var res;
        if (dateEquals(beginTime, endTime))
          res = `<text>${timeWithoutSeconds(beginTime)}</text></text>${timeWithoutSeconds(endTime)}</text>`;
        else if (dateEquals(beginTime, state.selectedDay) && !dateEquals(beginTime, endTime))
          res = `<text style="color:rgb(0,75,225)">开始</text></text>${timeWithoutSeconds(beginTime)}</text>`;
        else if (dateEquals(endTime, state.selectedDay) && !dateEquals(beginTime, endTime))
          res = `<text text style="color:black">结束</text></text>${timeWithoutSeconds(endTime)}</text>`;
        return res;
      }
      function changeRepeatRule() {
        if (state.selectedTask.period == state.task.period && state.selectedTask.periodUnit == state.task.periodUnit && state.selectedTask.deadline == state.task.deadline && state.selectedTask.count == state.task.count && state.selectedTask.custom == state.task.custom)
          return;
        ChangeRepeatRule({
          count: state.task.count,
          taskId: state.selectedTask.taskId,
          instanceId: state.selectedTask.instanceId,
          period: state.task.period,
          periodUnit: state.task.periodUnit,
          deadline: state.task.deadline,
          custom: state.task.custom,
          taskBeginTime: state.selectedTask.beginTime
        }, state.mode, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          } else {
            uni.showToast({
              title: "已修改",
              icon: "none"
            });
            state.selectedTask.period = state.task.period;
            state.selectedTask.periodUnit = state.task.periodUnit;
            state.selectedTask.deadline = state.task.deadline;
            state.selectedTask.count = state.task.count;
            state.selectedTask.custom = state.task.custom;
          }
        });
      }
      function finishOrNot(task) {
        var state2 = 0;
        if (task.state == TaskState.unfinished)
          state2 = TaskState.finished;
        else if (task.state == TaskState.finished)
          state2 = TaskState.unfinished;
        FinishOrNot$1(task.instanceId, state2, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          task.state = state2;
        });
      }
      const __returned__ = { popup, frequencyPopup, defRulePopup, detailPopup, priorityPopup, customPopup, editModePopup, today: today2, taskPageOpt, pattern: pattern2, state, openToEdit, modeChange, beforeClosePopup, closePopup, popupClose, reloadTaskModel, pick, allDay, seeTaskDetail, titleInput, editTask, multiSelect, addReminderInfoModel, changeNotifyMode, notify, takeCustom, takeCustomMode, takeCount, takeDeadline, dateChange, getData, getDataCallback, updateTask, closeDetailPopup, removeReminder, openEditOrCancelTask, openEditUI, beginEndTimeStr, changeRepeatRule, finishOrNot, reactive: vue.reactive, onMounted: vue.onMounted, ref: vue.ref, nextTick: vue.nextTick, get timeWithoutSeconds() {
        return timeWithoutSeconds;
      }, get priority() {
        return priority;
      }, get delayToRun() {
        return delayToRun;
      }, get frequency() {
        return frequency;
      }, get CalendarDisplayWay() {
        return CalendarDisplayWay;
      }, get PageOption() {
        return PageOption;
      }, get dateEquals() {
        return dateEquals;
      }, get weekdays() {
        return weekdays;
      }, get customDef() {
        return customDef;
      }, get getDateStr() {
        return getDateStr;
      }, get loading() {
        return loading;
      }, get copy() {
        return copy;
      }, get getDateTimeStr() {
        return getDateTimeStr;
      }, get remindModeValues() {
        return remindModeValues;
      }, get ReminderInfo() {
        return ReminderInfo;
      }, get ValueText() {
        return ValueText;
      }, get getRuleText() {
        return getRuleText;
      }, get dateGE() {
        return dateGE;
      }, get onlyDate() {
        return onlyDate;
      }, get TaskState() {
        return TaskState;
      }, get TaskReminderKey() {
        return TaskReminderKey$1;
      }, get CreateTask() {
        return CreateTask;
      }, get GetTasks() {
        return GetTasks$1;
      }, get GetTaskReminders() {
        return GetTaskReminders;
      }, get CancelTask() {
        return CancelTask;
      }, get AddReminder() {
        return AddReminder;
      }, get RemoveReminder() {
        return RemoveReminder;
      }, get UpdateTask() {
        return UpdateTask$1;
      }, get ChangeRepeatRule() {
        return ChangeRepeatRule;
      }, get FinishOrNot() {
        return FinishOrNot$1;
      }, get FreshReminderTiming() {
        return FreshReminderTiming;
      }, get user() {
        return user;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_k_calendar = vue.resolveComponent("k-calendar");
    const _component_k_split = vue.resolveComponent("k-split");
    const _component_uni_swipe_action_item = resolveEasycom(vue.resolveDynamicComponent("uni-swipe-action-item"), __easycom_1$3);
    const _component_uni_swipe_action = resolveEasycom(vue.resolveDynamicComponent("uni-swipe-action"), __easycom_2$1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    const _component_k_radio_group = vue.resolveComponent("k-radio-group");
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2);
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "index" }, [
          vue.createVNode(_component_k_calendar, {
            showWay: $setup.state.showWay,
            onModeChange: $setup.modeChange,
            onOnChange: $setup.dateChange
          }, null, 8, ["showWay"]),
          $setup.state.showWay != $setup.CalendarDisplayWay.year ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
            key: 0,
            class: "content",
            "scroll-y": true
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.taskPageOpt.data, (task, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "todo",
                  key: index,
                  onClick: ($event) => $setup.seeTaskDetail(index)
                }, [
                  !$setup.dateGE(task.beginTime, $setup.today) && !$setup.dateGE(task.endTime, $setup.today) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "mask"
                  })) : vue.createCommentVNode("v-if", true),
                  vue.createVNode(
                    _component_uni_swipe_action,
                    { style: { "width": "100%" } },
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode(
                          _component_uni_swipe_action_item,
                          null,
                          {
                            left: vue.withCtx(() => [
                              task.state == $setup.TaskState.unfinished ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 0,
                                class: "finishBtn",
                                onClick: vue.withModifiers(($event) => $setup.finishOrNot(task), ["stop"])
                              }, "完成", 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                              task.state == $setup.TaskState.finished ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 1,
                                class: "finishBtn",
                                onClick: vue.withModifiers(($event) => $setup.finishOrNot(task), ["stop"]),
                                style: { "background-color": "red", "width": "60px" }
                              }, "取消完成 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                            ]),
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", { class: "title" }, [
                                vue.createElementVNode("checkbox-group", {
                                  onChange: ($event) => $setup.finishOrNot(task)
                                }, [
                                  vue.createElementVNode("checkbox", {
                                    checked: task.state == $setup.TaskState.finished,
                                    style: { "transform": "scale(0.7)" }
                                  }, null, 8, ["checked"])
                                ], 40, ["onChange"]),
                                vue.createElementVNode("view", {
                                  class: "time",
                                  innerHTML: $setup.beginEndTimeStr(task)
                                }, null, 8, ["innerHTML"]),
                                vue.createElementVNode("view", { style: { "display": "flex", "align-items": "center" } }, [
                                  vue.createVNode(_component_k_split, {
                                    width: 4,
                                    height: 18
                                  }),
                                  vue.createElementVNode("view", { class: "title-text" }, [
                                    vue.createElementVNode(
                                      "view",
                                      { class: "title-content" },
                                      vue.toDisplayString(task.title),
                                      1
                                      /* TEXT */
                                    ),
                                    vue.createElementVNode(
                                      "view",
                                      { class: "title-description" },
                                      vue.toDisplayString(task.description),
                                      1
                                      /* TEXT */
                                    )
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createVNode(
          _component_uni_popup,
          {
            type: "right",
            ref: "popup",
            "background-color": "#fff",
            onChange: $setup.beforeClosePopup,
            style: { "z-index": "101" }
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("scroll-view", {
                class: "popup",
                "scroll-y": true
              }, [
                vue.createElementVNode("view", { class: "header" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    onClick: $setup.closePopup,
                    class: "close",
                    size: 25
                  }),
                  vue.createElementVNode(
                    "text",
                    { style: { "font-weight": "600" } },
                    vue.toDisplayString($setup.state.isTaskUpdate ? "修改任务" : "新建任务"),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(_component_uni_icons, {
                    type: "checkmarkempty",
                    style: vue.normalizeStyle($setup.state.canCreateTask ? "" : "color:lightgray"),
                    size: 25,
                    class: "create",
                    onClick: $setup.editTask
                  }, null, 8, ["style"])
                ]),
                vue.createVNode(_component_uni_list, {
                  border: true,
                  style: { "width": "94%" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_list_item, {
                      "show-extra-icon": true,
                      "extra-icon": { type: "bars" }
                    }, {
                      body: vue.withCtx(() => [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            type: "text",
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.state.task.title = $event),
                            placeholder: "标题",
                            maxlength: "30",
                            onInput: $setup.titleInput
                          },
                          null,
                          544
                          /* NEED_HYDRATION, NEED_PATCH */
                        ), [
                          [vue.vModelText, $setup.state.task.title]
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, {
                      "show-extra-icon": true,
                      "extra-icon": { type: "compose", size: "27" }
                    }, {
                      body: vue.withCtx(() => [
                        vue.withDirectives(vue.createElementVNode(
                          "textarea",
                          {
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.state.task.description = $event),
                            placeholder: "内容描述"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vModelText, $setup.state.task.description]
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, {
                      "show-extra-icon": true,
                      "extra-icon": { type: "map", size: "22" }
                    }, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "time" }, [
                          vue.createElementVNode("text", null, " 设置时间"),
                          vue.createElementVNode("view", { style: { "font-size": "13px" } }, [
                            vue.createTextVNode("全天  "),
                            vue.createElementVNode("switch", {
                              onChange: $setup.allDay,
                              checked: $setup.state.allday,
                              style: { "transform": "scale(0.8)" }
                            }, null, 40, ["checked"])
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "time" }, [
                          vue.createElementVNode("text", null, "开始"),
                          vue.createElementVNode("view", { style: { "display": "flex" } }, [
                            vue.createElementVNode("picker", {
                              mode: "date",
                              value: $setup.state.startTime.date,
                              start: "1970-01-01",
                              onChange: _cache[2] || (_cache[2] = ($event) => $setup.pick($event, "begin-date")),
                              disabled: $setup.state.allday
                            }, [
                              vue.createElementVNode(
                                "text",
                                { class: "time-str" },
                                vue.toDisplayString($setup.state.startTime.date),
                                1
                                /* TEXT */
                              )
                            ], 40, ["value", "disabled"]),
                            vue.createTextVNode("   "),
                            vue.createElementVNode("picker", {
                              mode: "time",
                              value: $setup.state.startTime.time,
                              start: $setup.state.startTime.time,
                              end: "23:59",
                              onChange: _cache[3] || (_cache[3] = ($event) => $setup.pick($event, "begin-time")),
                              disabled: $setup.state.allday
                            }, [
                              vue.createElementVNode(
                                "text",
                                { class: "time-str" },
                                vue.toDisplayString($setup.state.startTime.time),
                                1
                                /* TEXT */
                              )
                            ], 40, ["value", "start", "disabled"])
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "time" }, [
                          vue.createElementVNode("text", null, "结束"),
                          vue.createElementVNode("view", { style: { "display": "flex" } }, [
                            vue.createElementVNode("picker", {
                              mode: "date",
                              value: $setup.state.endTime.date,
                              start: "1970-01-01",
                              disabled: $setup.state.allday,
                              onChange: _cache[4] || (_cache[4] = ($event) => $setup.pick($event, "end-date"))
                            }, [
                              vue.createElementVNode(
                                "text",
                                { class: "time-str" },
                                vue.toDisplayString($setup.state.endTime.date),
                                1
                                /* TEXT */
                              )
                            ], 40, ["value", "disabled"]),
                            vue.createTextVNode("   "),
                            vue.createElementVNode("picker", {
                              mode: "time",
                              value: $setup.state.endTime.time,
                              start: $setup.state.endTime.time,
                              end: "23:59",
                              onChange: _cache[5] || (_cache[5] = ($event) => $setup.pick($event, "end-time")),
                              disabled: $setup.state.allday
                            }, [
                              vue.createElementVNode(
                                "text",
                                { class: "time-str" },
                                vue.toDisplayString($setup.state.endTime.time),
                                1
                                /* TEXT */
                              )
                            ], 40, ["value", "start", "disabled"])
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "priority" }, [
                          vue.createElementVNode("text", null, "设置优先级"),
                          vue.createElementVNode("view", {
                            onClick: _cache[6] || (_cache[6] = ($event) => $setup.priorityPopup.open())
                          }, [
                            vue.createVNode(_component_uni_icons, { type: "gear" }),
                            vue.createElementVNode(
                              "text",
                              { style: { "font-size": "13px", "color": "rgb(0,75,213)" } },
                              vue.toDisplayString($setup.state.priority[$setup.state.task.priority - 1].text),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_list, {
                  border: true,
                  style: { "width": "94%", "margin-top": "5px", "font-size": "15px" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "time" }, [
                          vue.createElementVNode("view", { style: { "display": "flex", "align-items": "center" } }, [
                            vue.createElementVNode("image", {
                              src: _imports_5,
                              style: { "width": "24px", "height": "24px" }
                            }),
                            vue.createElementVNode("text", { style: { "margin-left": "3px" } }, "重复")
                          ]),
                          $setup.state.isTaskUpdate && $setup.state.frequency.selection > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            onClick: $setup.changeRepeatRule,
                            size: "mini",
                            style: { "margin-left": "5px", "font-size": "13px" }
                          }, "修改")) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode(
                            "view",
                            {
                              onClick: _cache[7] || (_cache[7] = ($event) => $setup.frequencyPopup.open()),
                              class: "def-text"
                            },
                            vue.toDisplayString($setup.state.frequency.defText),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "time" }, [
                          vue.createElementVNode("view", null, [
                            vue.createVNode(_component_uni_icons, { type: "notification" }),
                            vue.createElementVNode("text", { style: { "margin-left": "3px" } }, "提醒")
                          ]),
                          vue.createElementVNode("picker", {
                            range: $setup.state.notifyOpt,
                            mode: "multiSelector",
                            onChange: $setup.addReminderInfoModel,
                            onColumnchange: $setup.changeNotifyMode
                          }, [
                            vue.createElementVNode("text", { class: "def-text" }, "设置提醒")
                          ], 40, ["range"])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.state.task.reminderInfoModels, (reminder, index) => {
                        return vue.openBlock(), vue.createBlock(
                          _component_uni_list_item,
                          {
                            key: index,
                            class: "notify-item"
                          },
                          {
                            body: vue.withCtx(() => [
                              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between", "width": "100%" } }, [
                                vue.createElementVNode(
                                  "text",
                                  null,
                                  vue.toDisplayString($setup.ReminderInfo.getModeValueText(reminder)),
                                  1
                                  /* TEXT */
                                ),
                                vue.createVNode(_component_uni_icons, {
                                  type: "closeempty",
                                  onClick: ($event) => $setup.removeReminder(index)
                                }, null, 8, ["onClick"])
                              ])
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(
                  _component_uni_popup,
                  {
                    type: "center",
                    ref: "frequencyPopup",
                    "background-color": "#fff",
                    "border-radius": "5px 5px 5px 5px",
                    style: { "height": "75vh" }
                  },
                  {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_k_radio_group, {
                        data: $setup.state.frequency.data,
                        modelValue: $setup.state.frequency.selection,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.state.frequency.selection = $event),
                        containDef: true,
                        onOnChange: $setup.notify
                      }, null, 8, ["data", "modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  512
                  /* NEED_PATCH */
                ),
                vue.createVNode(
                  _component_uni_popup,
                  {
                    ref: "defRulePopup",
                    type: "center",
                    "background-color": "#fff"
                  },
                  {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("scroll-view", {
                        "scroll-y": true,
                        class: "popup"
                      }, [
                        vue.createElementVNode("view", {
                          class: "header",
                          style: { "justify-content": "flex-start" }
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "closeempty",
                            onClick: _cache[9] || (_cache[9] = ($event) => $setup.defRulePopup.close())
                          }),
                          vue.createElementVNode("text", { style: { "font-weight": "600", "margin-left": "10%" } }, "自定义")
                        ]),
                        vue.createElementVNode("picker", {
                          mode: "multiSelector",
                          range: $setup.state.frequency.multiData,
                          value: $setup.state.frequency.selectedOne,
                          onChange: $setup.multiSelect,
                          style: { "font-size": "16px", "margin": "0 15px" }
                        }, [
                          vue.createElementVNode("view", { class: "def" }, [
                            vue.createElementVNode("text", null, "自定义："),
                            vue.createElementVNode(
                              "text",
                              { style: { "font-size": "13px", "color": "gray", "letter-spacing": "1px" } },
                              vue.toDisplayString($setup.state.defOpt.text),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.withDirectives(vue.createVNode(_component_k_radio_group, {
                            data: $setup.state.weekdays,
                            checkMode: true,
                            onOnChange: $setup.takeCustom
                          }, null, 8, ["data"]), [
                            [vue.vShow, $setup.state.task.periodUnit == 2]
                          ])
                        ], 40, ["range", "value"]),
                        vue.createVNode(_component_uni_list, { style: { "width": "94%" } }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                              body: vue.withCtx(() => [
                                vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between", "width": "100%" } }, [
                                  vue.createElementVNode("text", null, "有效"),
                                  vue.createElementVNode("view", { style: { "display": "flex" } }, [
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: "def-text",
                                        style: { "margin-right": "5px" },
                                        onClick: _cache[10] || (_cache[10] = ($event) => $setup.customPopup.open())
                                      },
                                      vue.toDisplayString($setup.state.defOpt.mode),
                                      1
                                      /* TEXT */
                                    ),
                                    $setup.state.defOpt.val == 1 ? (vue.openBlock(), vue.createElementBlock("picker", {
                                      key: 0,
                                      mode: "date",
                                      value: $setup.state.task.deadline,
                                      fields: "year month day",
                                      onChange: $setup.takeDeadline
                                    }, [
                                      vue.createElementVNode(
                                        "text",
                                        { class: "def-text" },
                                        vue.toDisplayString($setup.state.task.deadline == null ? $setup.getDateStr($setup.today) : $setup.getDateStr($setup.state.task.deadline)),
                                        1
                                        /* TEXT */
                                      )
                                    ], 40, ["value"])) : vue.createCommentVNode("v-if", true),
                                    $setup.state.defOpt.val == 2 ? (vue.openBlock(), vue.createElementBlock("picker", {
                                      key: 1,
                                      range: $setup.state.frequency.multiData[2],
                                      onChange: $setup.takeCount
                                    }, [
                                      vue.createElementVNode(
                                        "text",
                                        { class: "def-text" },
                                        vue.toDisplayString($setup.state.task.count) + "次",
                                        1
                                        /* TEXT */
                                      )
                                    ], 40, ["range"])) : vue.createCommentVNode("v-if", true)
                                  ])
                                ])
                              ]),
                              _: 1
                              /* STABLE */
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  512
                  /* NEED_PATCH */
                )
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(
          _component_uni_popup,
          {
            "background-color": "#fff",
            ref: "detailPopup",
            type: "right"
          },
          {
            default: vue.withCtx(() => [
              $setup.state.selectedTask != null ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                key: 0,
                class: "task-detail",
                "scroll-y": true
              }, [
                vue.createElementVNode("view", { class: "header" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    onClick: $setup.closeDetailPopup,
                    class: "close",
                    size: 25
                  }),
                  vue.createElementVNode("text", { style: { "font-weight": "600" } }, "查看/修改任务")
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "task-detail-title" },
                  vue.toDisplayString($setup.state.selectedTask.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", {
                  innerHTML: "任务描述：" + $setup.state.selectedTask.description,
                  class: "description"
                }, null, 8, ["innerHTML"]),
                vue.createElementVNode(
                  "view",
                  { class: "def-text" },
                  "开始：" + vue.toDisplayString($setup.getDateTimeStr($setup.state.selectedTask.beginTime, $setup.today.getFullYear())),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "def-text" },
                  "结束：" + vue.toDisplayString($setup.getDateTimeStr($setup.state.selectedTask.endTime, $setup.today.getFullYear())),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_uni_list, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_list_item, null, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", null, [
                          vue.createVNode(_component_uni_icons, { type: "notification" }),
                          vue.createElementVNode("text", { style: { "margin-left": "3px", "font-size": "14px" } }, "提醒")
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.state.selectedTask.reminderInfoModels, (reminder, index) => {
                        return vue.openBlock(), vue.createBlock(
                          _component_uni_list_item,
                          { key: index },
                          {
                            body: vue.withCtx(() => [
                              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between", "width": "100%" } }, [
                                vue.createElementVNode(
                                  "text",
                                  { style: { "height": "25px", "line-height": "25px", "font-size": "14px", "color": "rgb(0,75,213)" } },
                                  vue.toDisplayString($setup.ReminderInfo.getModeValueText(reminder)),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    vue.createVNode(_component_uni_list_item, null, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", null, [
                          vue.createVNode(_component_uni_icons, { type: "loop" }),
                          vue.createElementVNode(
                            "text",
                            { class: "repeat" },
                            vue.toDisplayString($setup.getRuleText($setup.state.selectedTask)),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }),
                $setup.state.selectedTask.repeatable && $setup.state.selectedTask.taskId == $setup.state.selectedTask.instanceId ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "tips"
                }, " tips:重复任务下的主任务的“仅此任务”编辑模式只针对任务基本信息，编辑规则/提醒默认为全部 ")) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { class: "func" }, [
                  vue.createElementVNode("view", {
                    class: "detail-func",
                    onClick: $setup.openEditUI
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "compose",
                      size: 30
                    }),
                    vue.createElementVNode("text", null, "编辑")
                  ]),
                  vue.createElementVNode("view", {
                    class: "detail-func",
                    onClick: _cache[11] || (_cache[11] = ($event) => {
                      $setup.state.isTaskCancel = true;
                      $setup.openEditUI();
                    })
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "trash",
                      size: 30
                    }),
                    vue.createElementVNode("text", null, "删除")
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(
          _component_uni_popup,
          {
            type: "center",
            "background-color": "#fff",
            "border-radius": "10px 10px 10px 10px",
            ref: "priorityPopup",
            style: { "z-index": "101" }
          },
          {
            default: vue.withCtx(() => [
              vue.createVNode(_component_k_radio_group, {
                data: $setup.state.priority,
                modelValue: $setup.state.task.priority,
                "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.state.task.priority = $event),
                onOnChange: _cache[13] || (_cache[13] = ($event) => $setup.priorityPopup.close())
              }, null, 8, ["data", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(
          _component_uni_popup,
          {
            type: "center",
            "background-color": "#fff",
            "border-radius": "10px 10px 10px 10px",
            ref: "customPopup"
          },
          {
            default: vue.withCtx(() => [
              vue.createVNode(_component_k_radio_group, {
                data: $setup.state.defOpt.data,
                modelValue: $setup.state.defOpt.val,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.state.defOpt.val = $event),
                onOnChange: $setup.takeCustomMode
              }, null, 8, ["data", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(
          _component_uni_popup,
          {
            type: "center",
            "background-color": "#fff",
            "border-radius": "10px 10px 10px 10px",
            ref: "editModePopup"
          },
          {
            default: vue.withCtx(() => [
              vue.createVNode(_component_k_radio_group, {
                data: $setup.state.modeContent,
                modelValue: $setup.state.mode,
                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.state.mode = $event),
                onOnChange: $setup.openEditOrCancelTask
              }, null, 8, ["data", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(_component_uni_fab, {
          vertical: "bottom",
          pattern: $setup.pattern,
          "pop-menu": false,
          horizontal: "right",
          onFabClick: $setup.openToEdit
        }, null, 8, ["pattern"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-02281a80"], ["__file", "D:/repos/html+css+js/SelfSchedule/pages/index.vue"]]);
  const _sfc_main$g = {
    name: "uniCollapseItem",
    props: {
      // 列表标题
      title: {
        type: String,
        default: ""
      },
      name: {
        type: [Number, String],
        default: ""
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示动画,app 端默认不开启动画，卡顿严重
      showAnimation: {
        type: Boolean,
        default: false
      },
      // 是否展开
      open: {
        type: Boolean,
        default: false
      },
      // 缩略图
      thumb: {
        type: String,
        default: ""
      },
      // 标题分隔线显示类型
      titleBorder: {
        type: String,
        default: "auto"
      },
      border: {
        type: Boolean,
        default: true
      },
      showArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        isOpen: false,
        isheight: null,
        height: 0,
        elId,
        nameSync: 0
      };
    },
    watch: {
      open(val) {
        this.isOpen = val;
        this.onClick(val, "init");
      }
    },
    updated(e2) {
      this.$nextTick(() => {
        this.init(true);
      });
    },
    created() {
      this.collapse = this.getCollapse();
      this.oldHeight = 0;
      this.onClick(this.open, "init");
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    mounted() {
      if (!this.collapse)
        return;
      if (this.name !== "") {
        this.nameSync = this.name;
      } else {
        this.nameSync = this.collapse.childrens.length + "";
      }
      if (this.collapse.names.indexOf(this.nameSync) === -1) {
        this.collapse.names.push(this.nameSync);
      } else {
        formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue:154", `name 值 ${this.nameSync} 重复`);
      }
      if (this.collapse.childrens.indexOf(this) === -1) {
        this.collapse.childrens.push(this);
      }
      this.init();
    },
    methods: {
      init(type) {
        this.getCollapseHeight(type);
      },
      uninstall() {
        if (this.collapse) {
          this.collapse.childrens.forEach((item, index) => {
            if (item === this) {
              this.collapse.childrens.splice(index, 1);
            }
          });
          this.collapse.names.forEach((item, index) => {
            if (item === this.nameSync) {
              this.collapse.names.splice(index, 1);
            }
          });
        }
      },
      onClick(isOpen, type) {
        if (this.disabled)
          return;
        this.isOpen = isOpen;
        if (this.isOpen && this.collapse) {
          this.collapse.setAccordion(this);
        }
        if (type !== "init") {
          this.collapse.onChange(isOpen, this);
        }
      },
      getCollapseHeight(type, index = 0) {
        const views = uni.createSelectorQuery().in(this);
        views.select(`#${this.elId}`).fields({
          size: true
        }, (data) => {
          if (index >= 10)
            return;
          if (!data) {
            index++;
            this.getCollapseHeight(false, index);
            return;
          }
          this.height = data.height;
          this.isheight = true;
          if (type)
            return;
          this.onClick(this.isOpen, "init");
        }).exec();
      },
      getNvueHwight(type) {
        dom.getComponentRect(this.$refs["collapse--hook"], (option) => {
          if (option && option.result && option.size) {
            this.height = option.size.height;
            this.isheight = true;
            if (type)
              return;
            this.onClick(this.open, "init");
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getCollapse(name = "uniCollapse") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse-item" }, [
      vue.createCommentVNode(" onClick(!isOpen) "),
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick(!$data.isOpen)),
          class: vue.normalizeClass(["uni-collapse-item__title", { "is-open": $data.isOpen && $props.titleBorder === "auto", "uni-collapse-item-border": $props.titleBorder !== "none" }])
        },
        [
          vue.createElementVNode("view", { class: "uni-collapse-item__title-wrap" }, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-collapse-item__title-box", { "is-disabled": $props.disabled }])
                },
                [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: $props.thumb,
                    class: "uni-collapse-item__title-img"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    { class: "uni-collapse-item__title-text" },
                    vue.toDisplayString($props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ], true)
          ]),
          $props.showArrow ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass([{ "uni-collapse-item__title-arrow-active": $data.isOpen, "uni-collapse-item--animation": $props.showAnimation === true }, "uni-collapse-item__title-arrow"])
            },
            [
              vue.createVNode(_component_uni_icons, {
                color: $props.disabled ? "#ddd" : "#bbb",
                size: "14",
                type: "bottom"
              }, null, 8, ["color"])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-collapse-item__wrap", { "is--transition": $props.showAnimation }]),
          style: vue.normalizeStyle({ height: $data.isOpen ? "fit-content" : "0" })
        },
        [
          vue.createElementVNode("view", {
            id: $data.elId,
            ref: "collapse--hook",
            class: vue.normalizeClass(["uni-collapse-item__wrap-content", { open: $data.isheight, "uni-collapse-item--border": $props.border && $data.isOpen }])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["id"])
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-3d2dde9f"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue"]]);
  const _sfc_main$f = {
    name: "uniCollapse",
    emits: ["change", "activeItem", "input", "update:modelValue"],
    props: {
      value: {
        type: [String, Array],
        default: ""
      },
      modelValue: {
        type: [String, Array],
        default: ""
      },
      accordion: {
        // 是否开启手风琴效果
        type: [Boolean, String],
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      // TODO 兼容 vue2 和 vue3
      dataValue() {
        let value = typeof this.value === "string" && this.value === "" || Array.isArray(this.value) && this.value.length === 0;
        let modelValue = typeof this.modelValue === "string" && this.modelValue === "" || Array.isArray(this.modelValue) && this.modelValue.length === 0;
        if (value) {
          return this.modelValue;
        }
        if (modelValue) {
          return this.value;
        }
        return this.value;
      }
    },
    watch: {
      dataValue(val) {
        this.setOpen(val);
      }
    },
    created() {
      this.childrens = [];
      this.names = [];
    },
    mounted() {
      this.$nextTick(() => {
        this.setOpen(this.dataValue);
      });
    },
    methods: {
      setOpen(val) {
        let str = typeof val === "string";
        let arr = Array.isArray(val);
        this.childrens.forEach((vm, index) => {
          if (str) {
            if (val === vm.nameSync) {
              if (!this.accordion) {
                formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:75", "accordion 属性为 false ,v-model 类型应该为 array");
                return;
              }
              vm.isOpen = true;
            }
          }
          if (arr) {
            val.forEach((v2) => {
              if (v2 === vm.nameSync) {
                if (this.accordion) {
                  formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:85", "accordion 属性为 true ,v-model 类型应该为 string");
                  return;
                }
                vm.isOpen = true;
              }
            });
          }
        });
        this.emit(val);
      },
      setAccordion(self2) {
        if (!this.accordion)
          return;
        this.childrens.forEach((vm, index) => {
          if (self2 !== vm) {
            vm.isOpen = false;
          }
        });
      },
      resize() {
        this.childrens.forEach((vm, index) => {
          vm.getCollapseHeight();
        });
      },
      onChange(isOpen, self2) {
        let activeItem = [];
        if (this.accordion) {
          activeItem = isOpen ? self2.nameSync : "";
        } else {
          this.childrens.forEach((vm, index) => {
            if (vm.isOpen) {
              activeItem.push(vm.nameSync);
            }
          });
        }
        this.$emit("change", activeItem);
        this.emit(activeItem);
      },
      emit(val) {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-3f050360"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue"]]);
  const _sfc_main$e = {
    name: "UniTag",
    emits: ["click"],
    props: {
      type: {
        // 标签类型default、primary、success、warning、error、royal
        type: String,
        default: "default"
      },
      size: {
        // 标签大小 normal, small
        type: String,
        default: "normal"
      },
      // 标签内容
      text: {
        type: String,
        default: ""
      },
      disabled: {
        // 是否为禁用状态
        type: [Boolean, String],
        default: false
      },
      inverted: {
        // 是否为空心
        type: [Boolean, String],
        default: false
      },
      circle: {
        // 是否为圆角样式
        type: [Boolean, String],
        default: false
      },
      mark: {
        // 是否为标记样式
        type: [Boolean, String],
        default: false
      },
      customStyle: {
        type: String,
        default: ""
      }
    },
    computed: {
      classes() {
        const {
          type,
          disabled,
          inverted,
          circle,
          mark,
          size,
          isTrue
        } = this;
        const classArr = [
          "uni-tag--" + type,
          "uni-tag--" + size,
          isTrue(disabled) ? "uni-tag--disabled" : "",
          isTrue(inverted) ? "uni-tag--" + type + "--inverted" : "",
          isTrue(circle) ? "uni-tag--circle" : "",
          isTrue(mark) ? "uni-tag--mark" : "",
          // type === 'default' ? 'uni-tag--default' : 'uni-tag-text',
          isTrue(inverted) ? "uni-tag--inverted uni-tag-text--" + type : "",
          size === "small" ? "uni-tag-text--small" : ""
        ];
        return classArr.join(" ");
      }
    },
    methods: {
      isTrue(value) {
        return value === true || value === "true";
      },
      onClick() {
        if (this.isTrue(this.disabled))
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.text ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass(["uni-tag", $options.classes]),
        style: vue.normalizeStyle($props.customStyle),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      },
      vue.toDisplayString($props.text),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-1f94d070"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-tag/components/uni-tag/uni-tag.vue"]]);
  const pages = [
    {
      path: "pages/login",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/habit",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/fourQuadrants",
      style: {
        navigationStyle: "custom"
      }
    }
  ];
  const tabBar = {
    color: "#bfbfbf",
    selectedColor: "#515151",
    borderStyle: "white",
    backgroundColor: "#fff",
    fontSize: "16",
    list: [
      {
        pagePath: "pages/index",
        text: "首页",
        iconPath: "static/calendar.png",
        selectedIconPath: "static/calendar-fill.png"
      },
      {
        pagePath: "pages/fourQuadrants",
        text: "四象限",
        iconPath: "static/分类.png",
        selectedIconPath: "static/全部.png"
      },
      {
        pagePath: "pages/habit",
        text: "习惯管理",
        iconPath: "static/favorite.png",
        selectedIconPath: "static/favorite-filling.png"
      },
      {
        pagePath: "pages/index",
        text: "设置",
        iconPath: "static/settings.png",
        selectedIconPath: "static/settings-fill.png"
      }
    ]
  };
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    "app-plus": {
      bounce: "none"
    }
  };
  const uniIdRouter = {};
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const e = {
    pages,
    tabBar,
    globalStyle,
    uniIdRouter,
    condition
  };
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t$1(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || /* @__PURE__ */ function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, l2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, h2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = l2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var l3 = 0; l3 < c3; l3 += i3)
            this._doProcessBlock(s3, l3);
          var h3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(h3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = h2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        h2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], A2 = e4[t4 + 14], C2 = e4[t4 + 15], P2 = i3[0], T2 = i3[1], x2 = i3[2], O2 = i3[3];
        P2 = u2(P2, T2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, T2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, T2, p2, 17, a2[2]), T2 = u2(T2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, T2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, T2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, T2, y2, 17, a2[6]), T2 = u2(T2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, T2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, T2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, T2, I2, 17, a2[10]), T2 = u2(T2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, T2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, T2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, T2, A2, 17, a2[14]), P2 = l2(P2, T2 = u2(T2, x2, O2, P2, C2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = l2(O2, P2, T2, x2, y2, 9, a2[17]), x2 = l2(x2, O2, P2, T2, S2, 14, a2[18]), T2 = l2(T2, x2, O2, P2, o3, 20, a2[19]), P2 = l2(P2, T2, x2, O2, m2, 5, a2[20]), O2 = l2(O2, P2, T2, x2, I2, 9, a2[21]), x2 = l2(x2, O2, P2, T2, C2, 14, a2[22]), T2 = l2(T2, x2, O2, P2, g2, 20, a2[23]), P2 = l2(P2, T2, x2, O2, v2, 5, a2[24]), O2 = l2(O2, P2, T2, x2, A2, 9, a2[25]), x2 = l2(x2, O2, P2, T2, f2, 14, a2[26]), T2 = l2(T2, x2, O2, P2, w2, 20, a2[27]), P2 = l2(P2, T2, x2, O2, k2, 5, a2[28]), O2 = l2(O2, P2, T2, x2, p2, 9, a2[29]), x2 = l2(x2, O2, P2, T2, _2, 14, a2[30]), P2 = h2(P2, T2 = l2(T2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = h2(O2, P2, T2, x2, w2, 11, a2[33]), x2 = h2(x2, O2, P2, T2, S2, 16, a2[34]), T2 = h2(T2, x2, O2, P2, A2, 23, a2[35]), P2 = h2(P2, T2, x2, O2, c3, 4, a2[36]), O2 = h2(O2, P2, T2, x2, g2, 11, a2[37]), x2 = h2(x2, O2, P2, T2, _2, 16, a2[38]), T2 = h2(T2, x2, O2, P2, I2, 23, a2[39]), P2 = h2(P2, T2, x2, O2, k2, 4, a2[40]), O2 = h2(O2, P2, T2, x2, o3, 11, a2[41]), x2 = h2(x2, O2, P2, T2, f2, 16, a2[42]), T2 = h2(T2, x2, O2, P2, y2, 23, a2[43]), P2 = h2(P2, T2, x2, O2, v2, 4, a2[44]), O2 = h2(O2, P2, T2, x2, b2, 11, a2[45]), x2 = h2(x2, O2, P2, T2, C2, 16, a2[46]), P2 = d2(P2, T2 = h2(T2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, T2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, T2, A2, 15, a2[50]), T2 = d2(T2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, T2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, T2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, T2, I2, 15, a2[54]), T2 = d2(T2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, T2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, T2, x2, C2, 10, a2[57]), x2 = d2(x2, O2, P2, T2, y2, 15, a2[58]), T2 = d2(T2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, T2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, T2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, T2, p2, 15, a2[62]), T2 = d2(T2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + T2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var l3 = c3[u3];
          c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "FUNCTION", u = "OBJECT", l = "CLIENT_DB", h = "pending", d = "fulfilled", p = "rejected";
  function f(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g(e2) {
    return "object" === f(e2);
  }
  function m(e2) {
    return "function" == typeof e2;
  }
  function y(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const _ = "REJECTED", w = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== h;
      }
    }
    exec() {
      return this.needRetry ? (this.status = h, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b = "app", A = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), C = b, P = I(""), T = I("[]") || [];
  let O = "";
  try {
    O = "";
  } catch (e2) {
  }
  let E = {};
  function L(e2, t2 = {}) {
    var n2, s2;
    return n2 = E, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (E[e2] = t2), E[e2];
  }
  E = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const R = ["invoke", "success", "fail", "complete"], U = L("_globalUniCloudInterceptor");
  function N(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = U[e3][t3];
        s2 || (s2 = U[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function D(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = U[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete U[e2];
  }
  function M(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function q(e2, t2) {
    return U[e2] && U[e2][t2] || [];
  }
  function F(e2) {
    N("callObject", e2);
  }
  const K = L("_globalUniCloudListener"), j = "response", $ = "needLogin", B = "refreshToken", W = "clientdb", H = "cloudfunction", J = "cloudobject";
  function z(e2) {
    return K[e2] || (K[e2] = []), K[e2];
  }
  function V(e2, t2) {
    const n2 = z(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function G(e2, t2) {
    const n2 = z(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function Y(e2, t2) {
    const n2 = z(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Q, X = false;
  function Z() {
    return Q || (Q = new Promise((e2) => {
      X && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (X = true, e2());
        }
        X || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Q);
  }
  function ee(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      m(s2) && (t2[n2] = y(s2));
    }
    return t2;
  }
  class te extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var ne = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync(), connectSocket: (e2) => uni.connectSocket(e2) };
  function se(e2) {
    return e2 && se(e2.__v_raw) || e2;
  }
  function re() {
    return { token: ne.getStorageSync("uni_id_token") || ne.getStorageSync("uniIdToken"), tokenExpired: ne.getStorageSync("uni_id_token_expired") };
  }
  function ie({ token: e2, tokenExpired: t2 } = {}) {
    e2 && ne.setStorageSync("uni_id_token", e2), t2 && ne.setStorageSync("uni_id_token_expired", t2);
  }
  let oe, ae;
  function ce() {
    return oe || (oe = uni.getSystemInfoSync()), oe;
  }
  function ue() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  let le = {};
  function he() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ae)
      return { ...le, ...ae, locale: e2, LOCALE: e2 };
    const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
    for (const e3 in t2)
      Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
    return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...le, ...ae, locale: e2, LOCALE: e2 };
  }
  var de = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400) {
          const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
          return s2(new te({ code: n3, message: r3, requestId: t3 }));
        }
        const r2 = e3.data;
        if (r2.error)
          return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var pe = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: w });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return de.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: l2, signature: h2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: l2, Signature: h2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = de.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: g2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var fe = { init(e2) {
    const t2 = new pe(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ge = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var me;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(me || (me = {}));
  var ye = function() {
  }, _e = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], l2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], l3 = n3[5], h2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & l3 ^ ~a3 & h2) + c2[p2] + u2[p2];
          d2 = h2, h2 = l3, l3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + l3 | 0, n3[6] = n3[6] + h2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(l2), t3.HmacSHA256 = i2._createHmacHelper(l2);
    }(Math), n2.SHA256);
  }), we = _e, ve = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const Ie = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function Se(e2) {
    return void 0 === e2;
  }
  function be(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  var ke;
  function Ae(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(ke || (ke = {}));
  const Ce = { adapter: null, runtime: void 0 }, Pe = ["anonymousUuidKey"];
  class Te extends ye {
    constructor() {
      super(), Ce.adapter.root.tcbObject || (Ce.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Ce.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Ce.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Ce.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Ce.adapter.root.tcbObject;
    }
  }
  function xe(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Te();
      case "none":
        return new Te();
      default:
        return t2.sessionStorage || new Te();
    }
  }
  class Oe {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Ce.adapter.primaryStorage || e2.persistence, this._storage = xe(this._persistence, Ce.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = xe(e2, Ce.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Pe.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        Se(r2) || be(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Ee = {}, Le = {};
  function Re(e2) {
    return Ee[e2];
  }
  class Ue {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Ne extends Ue {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const De = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Ne)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new Ue(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function Me(e2, t2) {
    De.on(e2, t2);
  }
  function qe(e2, t2 = {}) {
    De.fire(e2, t2);
  }
  function Fe(e2, t2) {
    De.off(e2, t2);
  }
  const Ke = "loginStateChanged", je = "loginStateExpire", $e = "loginTypeChanged", Be = "anonymousConverted", We = "refreshAccessToken";
  var He;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(He || (He = {}));
  const Je = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], ze = { "X-SDK-Version": "1.3.5" };
  function Ve(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function Ge() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...ze, "x-seqid": e2 } };
  }
  class Ye {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Ce.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Re(this.config.env), this._localCache = (t2 = this.config.env, Le[t2]), Ve(this._reqClass, "post", [Ge]), Ve(this._reqClass, "upload", [Ge]), Ve(this._reqClass, "download", [Ge]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new te({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === He.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          qe(je), this._cache.removeStore(n2);
        }
        throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return qe(We), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new te({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === Je.indexOf(e2)) {
        const { refreshTokenKey: e3 } = this._cache.keys;
        this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: l2, search: h2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), l2 && (d2 = { ...l2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(ge, "//tcb-api.tencentcloudapi.com/web", d2);
      h2 && (p2 += h2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new te({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}, n2 = {}) {
      const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === s2.data.code && -1 === Je.indexOf(e2)) {
        await this.refreshAccessToken();
        const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
        if (s3.data.code)
          throw new te({ code: s3.data.code, message: s3.data.message });
        return s3.data;
      }
      if (s2.data.code)
        throw new te({ code: s2.data.code, message: s2.data.message });
      return s2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const Qe = {};
  function Xe(e2) {
    return Qe[e2];
  }
  class Ze {
    constructor(e2) {
      this.config = e2, this._cache = Re(e2.env), this._request = Xe(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class et {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Re(this._envId), this._request = Xe(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  let tt$1 = class tt {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Re(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new et(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === He.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === He.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === He.WECHAT || this.loginType === He.WECHAT_OPEN || this.loginType === He.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  };
  class nt extends Ze {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), qe(Ke), qe($e, { env: this.config.env, loginType: He.ANONYMOUS, persistence: "local" });
        const e3 = new tt$1(this.config.env);
        return await e3.user.refresh(), e3;
      }
      throw new te({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), qe(Be, { env: this.config.env }), qe($e, { loginType: He.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new te({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, He.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class st extends Ze {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), qe(Ke), qe($e, { env: this.config.env, loginType: He.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new tt$1(this.config.env);
      throw new te({ message: "自定义登录失败" });
    }
  }
  class rt extends Ze {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), qe(Ke), qe($e, { env: this.config.env, loginType: He.EMAIL, persistence: this.config.persistence }), new tt$1(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class it extends Ze {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: He.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), qe(Ke), qe($e, { env: this.config.env, loginType: He.USERNAME, persistence: this.config.persistence }), new tt$1(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
    }
  }
  class ot {
    constructor(e2) {
      this.config = e2, this._cache = Re(e2.env), this._request = Xe(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Me($e, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new nt(this.config);
    }
    customAuthProvider() {
      return new st(this.config);
    }
    emailAuthProvider() {
      return new rt(this.config);
    }
    usernameAuthProvider() {
      return new it(this.config);
    }
    async signInAnonymously() {
      return new nt(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new rt(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new it(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new nt(this.config)), Me(Be, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === He.ANONYMOUS)
        throw new te({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), qe(Ke), qe($e, { env: this.config.env, loginType: He.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      Me(Ke, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      Me(je, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      Me(We, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      Me(Be, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      Me($e, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e2 } = this._cache.keys;
      return this._cache.getStore(e2) ? new tt$1(this.config.env) : null;
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new st(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const at = function(e2, t2) {
    t2 = t2 || Ie();
    const n2 = Xe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: l2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ct = function(e2, t2) {
    t2 = t2 || Ie();
    const n2 = Xe(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ut = function({ fileList: e2 }, t2) {
    if (t2 = t2 || Ie(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return Xe(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, lt = function({ fileList: e2 }, t2) {
    t2 = t2 || Ie(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return Xe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ht = async function({ fileID: e2 }, t2) {
    const n2 = (await lt.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = Xe(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, dt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
    const a2 = o2 || Ie();
    let c2;
    try {
      c2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
    return Xe(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
      if (e3.code)
        a2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          a2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            a2(new te({ message: "response data must be json" }));
          }
      }
      return a2.promise;
    }).catch((e3) => {
      a2(e3);
    }), a2.promise;
  }, pt = { timeout: 15e3, persistence: "session" }, ft = {};
  class gt {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Ce.adapter || (this.requestClient = new Ce.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...pt, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new gt(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Ce.adapter.primaryStorage || pt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Ee[t3] = new Oe(e3), Le[t3] = new Oe({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, Qe[n2.env] = new Ye(n2), this.authObj = new ot(this.config), this.authObj;
    }
    on(e2, t2) {
      return Me.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return Fe.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return dt.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return ut.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return lt.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return ht.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return at.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return ct.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      ft[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = ft[e2];
      if (!n2)
        throw new te({ message: `扩展${e2} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = Ae(e2) || {};
      t2 && (Ce.adapter = t2), n2 && (Ce.runtime = n2);
    }
  }
  var mt = new gt();
  function yt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class _t {
    post(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        ne.request({ url: yt("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: yt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const wt = { setItem(e2, t2) {
    ne.setStorageSync(e2, t2);
  }, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
    ne.removeStorageSync(e2);
  }, clear() {
    ne.clearStorageSync();
  } };
  var vt = { genAdapter: function() {
    return { root: {}, reqClass: _t, localStorage: wt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  mt.useAdapters(vt);
  const It = mt, St = It.init;
  It.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = St.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ee(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var bt = It;
  async function kt(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        ne.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function At(e2, t2) {
    let n2;
    for (let s2 = 0; s2 < e2.length; s2++) {
      const r2 = e2[s2];
      if (await kt(r2, t2)) {
        n2 = r2;
        break;
      }
    }
    return { address: n2, port: t2 };
  }
  const Ct = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
  var Pt = class {
    constructor(e2) {
      if (["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), !e2.endpoint)
        throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
      this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = ne;
    }
    async request(e2, t2 = true) {
      const n2 = t2;
      return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : de.wrappedRequest(e2, this.adapter.request));
    }
    requestLocal(e2) {
      return new Promise((t2, n2) => {
        this.adapter.request(Object.assign(e2, { complete(e3) {
          if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
            const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
            return n2(new te({ code: t3, message: s2 }));
          }
          t2({ success: true, result: e3.data });
        } }));
      });
    }
    setupRequest(e2) {
      const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
      n2["x-serverless-sign"] = de.sign(t2, this.config.clientSecret);
      const s2 = he();
      n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
      const { token: r2 } = re();
      return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
    }
    async setupLocalRequest(e2) {
      const t2 = he(), { token: n2 } = re(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await At(r2, i2);
      return { url: `http://${o2}:${i2}/${Ct[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(t2, false);
    }
    getUploadFileOptions(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    reportUploadFile(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
          const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
            e3 && e3.statusCode < 400 ? t4(e3) : r3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
          }, fail(e3) {
            r3(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
          } });
          "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
            s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
          });
        });
      }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(t2).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(n2).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var Tt = { init(e2) {
    const t2 = new Pt(e2), n2 = { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, xt = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Ot() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
      var t2 = 16 * Math.random() | 0;
      return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
    });
  }
  function Et(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = Date.now(), u2 = Ot(), l2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), h2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = we(e3.body).toString(xt), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = we(r3).toString(xt), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = ve(o3, e3.secretKey).toString(xt);
      return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
    }({ path: d2, query: p2, method: r2, headers: l2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: h2.sort() });
    return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, l2, { Authorization: f2 }) };
  }
  function Lt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
    return new Promise((i2, o2) => {
      ne.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return o2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function Rt(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Et(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return Lt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function Ut(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function Nt(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  class Dt {
    constructor(e2) {
      this.config = e2;
    }
    signedURL(e2, t2 = {}) {
      const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Ot(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
        return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
      }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", we(i2).toString(xt)].join("\n"), a2 = ve(o2, this.config.secretKey).toString(xt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
      return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
    }
  }
  var Mt = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new Dt(this.config);
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
        r2 && (a2["x-function-invoke-type"] = "async");
        const { url: c2, headers: u2 } = Et("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return Lt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
          let t3 = 0;
          if (r2) {
            const n3 = e4.data || {};
            t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
          }
          if (0 !== t3)
            throw new te({ code: t3, message: e4.errMsg, requestId: e4.requestId });
          return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
        }).catch((e4) => {
          throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await Rt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList不能为空数组" })), e2.length > 50 && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList数组长度不能超过50" }));
        const s2 = [];
        for (const t3 of e2) {
          "string" !== f(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
          const e3 = Ut.call(this, t3);
          s2.push({ file_id: e3, expire: 600 });
        }
        Rt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: Nt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
    async connectWebSocket(e2) {
      const { name: t2, query: n2 } = e2;
      return ne.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
      } });
    }
  };
  var qt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new Mt(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Ft({ data: e2 }) {
    let t2;
    t2 = he();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = re();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Kt(e2 = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${t2}:${n2}/system/check-function`, o2 = `http://${t2}:${n2}/cloudfunctions/${e2.name}`;
    return new Promise((t3, n3) => {
      ne.request({ method: "POST", url: i2, data: { name: e2.name, platform: C, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: t3, message: n3 }) => {
      if (0 !== t3) {
        switch (t3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e2.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e2.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR":
            console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
            break;
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction(e2);
      }
      return new Promise((t4, n4) => {
        const r3 = Ft.call(this, { data: e2.data });
        ne.request({ method: "POST", url: o2, data: { provider: s2, platform: C, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new te({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
          n4(new te({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const jt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var $t = /[\\^$.*+?()[\]{}|]/g, Bt = RegExp($t.source);
  function Wt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Bt.test(s2) ? s2.replace($t, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Jt = "request", zt = "response", Vt = "both";
  const En = { code: 2e4, message: "System error" }, Ln = { code: 20101, message: "Invalid client" };
  function Nn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new te({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || En.code, message: r2 || o2, cause: a2 });
  }
  let Mn;
  function $n({ secretType: e2 } = {}) {
    return e2 === Jt || e2 === zt || e2 === Vt;
  }
  function Bn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function Wn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = A;
      if (!n3)
        return {};
      e3 = /* @__PURE__ */ function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const l2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!l2)
      return false;
    if ((c2[l2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), Nn(Ln);
  }
  function Hn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Jn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Ft.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = $n(n3), o2 = Bn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Hn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Hn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = Wt(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = Wt(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: jt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && T ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Kt), o2 = Kt) : o2 = n2, o2 = o2.bind(e2), Bn(t3))
        a2 = n2.call(e2, t3);
      else if ($n(t3)) {
        a2 = new Mn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (Wn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new Mn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
    };
  }
  Mn = class {
    constructor() {
      throw Nn({ message: `Platform ${C} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const zn = Symbol("CLIENT_DB_INTERNAL");
  function Vn(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = zn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function Gn(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const Yn = ["db.Geo", "db.command", "command.aggregate"];
  function Qn(e2, t2) {
    return Yn.indexOf(`${e2}.${t2}`) > -1;
  }
  function Xn(e2) {
    switch (f(e2 = se(e2))) {
      case "array":
        return e2.map((e3) => Xn(e3));
      case "object":
        return e2._internalType === zn || Object.keys(e2).forEach((t2) => {
          e2[t2] = Xn(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function Zn(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class es {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: Xn(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Zn(e2), n2 = Zn(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === Zn(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Zn(e2), n2 = Zn(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return ts({ $method: e2, $param: Xn(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: Xn(t2) }), S) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function ts(e2, t2, n2) {
    return Vn(new es(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), Qn(s2, t3) ? ts({ $method: t3 }, e3, n2) : function() {
        return ts({ $method: t3, $param: Xn(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function ns({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function ss(e2, t2 = {}) {
    return Vn(new e2(t2), { get: (e3, t3) => Qn("db", t3) ? ts({ $method: t3 }, null, e3) : function() {
      return ts({ $method: t3, $param: Xn(Array.from(arguments)) }, null, e3);
    } });
  }
  class rs extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = L("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Gn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Gn(this._dbCallBacks)), this.env = Vn({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = Vn({}, { get: (e3, t3) => ns({ path: ["Geo"], method: t3 }) }), this.serverDate = ns({ path: [], method: "serverDate" }), this.RegExp = ns({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), M(q(o2, "fail"), e3).then(() => M(q(o2, "complete"), e3)).then(() => (r2(null, e3), Y(j, { type: W, content: e3 }), Promise.reject(e3)));
      }
      const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: l, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(B, { token: s3, tokenExpired: c3 }));
        const l2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < l2.length; t4++) {
          const { prop: n4, tips: s4 } = l2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return M(q(o2, "success"), e4).then(() => M(q(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return Y(j, { type: W, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const is = "token无效，跳转登录页面", os = "token过期，跳转登录页面", as = { TOKEN_INVALID_TOKEN_EXPIRED: os, TOKEN_INVALID_INVALID_CLIENTID: is, TOKEN_INVALID: is, TOKEN_INVALID_WRONG_TOKEN: is, TOKEN_INVALID_ANONYMOUS_USER: is }, cs = { "uni-id-token-expired": os, "uni-id-check-token-failed": is, "uni-id-token-not-exist": is, "uni-id-check-device-feature-failed": is };
  function us(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function ls(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(us(t2, e3.path)) : false === e3.needLogin && s2.push(us(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function hs(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function ds() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function ps() {
    return hs(ds());
  }
  function fs(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = hs(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const gs = !!e.uniIdRouter;
  const { loginPage: ms, routerNeedLogin: ys, resToLogin: _s, needLoginPage: ws, notNeedLoginPage: vs, loginPageInTabBar: Is } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ls(t2), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = ls(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: fs(i2, r2) };
  }();
  if (ws.indexOf(ms) > -1)
    throw new Error(`Login page [${ms}] should not be "needLogin", please check your pages.json`);
  function Ss(e2) {
    const t2 = ps();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function bs(e2) {
    const t2 = hs(Ss(e2));
    return !(vs.indexOf(t2) > -1) && (ws.indexOf(t2) > -1 || ys.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function ks({ redirect: e2 }) {
    const t2 = hs(e2), n2 = hs(ms);
    return ps() !== n2 && t2 !== n2;
  }
  function As({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !ks({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(ms, t2);
    Is ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    }, 0);
  }
  function Cs({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = re();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: cs[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: cs[e4] };
      }
      return n3;
    }();
    if (bs(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (z($).length > 0)
        return setTimeout(() => {
          Y($, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Ps() {
    !function() {
      const e3 = ds(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Cs({ url: e3 });
      t2 || n2 && As({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Cs({ url: e3.url });
        return t3 ? e3 : s2 ? (As({ api: n2, redirect: Ss(e3.url) }), false) : e3;
      } });
    }
  }
  function Ts() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in cs;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in as;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = z($);
        Z().then(() => {
          const n3 = ds();
          if (n3 && ks({ redirect: n3 }))
            return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (ms && As({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function xs(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        V(j, e4);
      }, e3.offResponse = function(e4) {
        G(j, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        V($, e4);
      }, e3.offNeedLogin = function(e4) {
        G($, e4);
      }, gs && (L("_globalUniCloudStatus").needLoginInit || (L("_globalUniCloudStatus").needLoginInit = true, Z().then(() => {
        Ps.call(e3);
      }), _s && Ts.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        V(B, e4);
      }, e3.offRefreshToken = function(e4) {
        G(B, e4);
      };
    }(e2);
  }
  let Os;
  const Es = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ls = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Rs() {
    const e2 = re().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Os(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  Os = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Ls.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = Es.indexOf(e2.charAt(i2++)) << 18 | Es.indexOf(e2.charAt(i2++)) << 12 | (n2 = Es.indexOf(e2.charAt(i2++))) << 6 | (s2 = Es.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Us = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), Ns = t$1(Us);
  const Ds = "manual";
  function Ms(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === Ds)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const l2 = t2.orderby || this.orderby;
      l2 && (n2 = n2.orderBy(l2));
      const h2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function qs(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await M(q(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...l2) {
          let h2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: u, data: { method: c2, params: l2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            h2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, h2 = { result: new te(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(B, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: l2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error(`Invalid errorOptions.type: ${i2.type}`);
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...l2);
                }
              }
            const n3 = new te({ subject: f2, code: g2, message: m2, requestId: h2.requestId });
            throw n3.detail = h2.result, Y(j, { type: J, content: n3 }), n3;
          }
          return Y(j, { type: J, content: h2.result }), h2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Fs(e2) {
    return L("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function Ks({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Fs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${C}\``);
  }
  async function js(e2) {
    const t2 = Fs(this);
    return t2.initPromise || (t2.initPromise = Ks.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function $s(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return js.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Bs(e2) {
    !function(e3) {
      le = e3;
    }(e2);
  }
  function Ws(e2) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e2]({ ...n2, success(e3) {
          s2(e3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    };
  }
  class Hs extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Ws("getSystemInfo")(), Ws("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Js(e2) {
    {
      const { osName: e3, osVersion: t3 } = ce();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await At(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === C.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function zs(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const Vs = { tcb: bt, tencent: bt, aliyun: fe, private: Tt, dcloud: Tt, alipay: qt };
  let Gs = new class {
    init(e2) {
      let t2 = {};
      const n2 = Vs[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === C;
        const n3 = P;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Js(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), zs(t2), Jn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = ss(rs, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = ss(rs, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = Rs, e3.chooseAndUploadFile = Ns.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return Ms(e3);
        } }), e3.SSEChannel = Hs, e3.initSecureNetworkByWeixin = $s(e3), e3.setCustomClientInfo = Bs, e3.importObject = qs(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || c;
              s2 = e5 !== c;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: u2 } = ee(n4), l2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : M(q(t3, "success"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (r2 && Y(j, { type: H, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : M(q(t3, "fail"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (Y(j, { type: H, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || u2))
              return l2;
            l2.then((e5) => {
              o2 && o2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            }, (e5) => {
              a2 && a2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            });
          };
        }(t2[e3], e3)).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = T;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], Gs = Gs.init(t2), Gs._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
        Gs[e3] = function() {
          return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Gs, { get mixinDatacom() {
      return Ms(Gs);
    } }), xs(Gs), Gs.addInterceptor = N, Gs.removeInterceptor = D, Gs.interceptObject = F;
  })();
  var Ys = Gs;
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode2 = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode2 === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode2 === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode2}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater: formater2 }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      const options = [
        messages2,
        locale
      ];
      locale = options[0];
      messages2 = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  const zhHans = {
    "uni-load-more.contentdown": "上拉显示更多",
    "uni-load-more.contentrefresh": "正在加载...",
    "uni-load-more.contentnomore": "没有更多数据了"
  };
  const zhHant = {
    "uni-load-more.contentdown": "上拉顯示更多",
    "uni-load-more.contentrefresh": "正在加載...",
    "uni-load-more.contentnomore": "沒有更多數據了"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  let platform;
  setTimeout(() => {
    platform = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t
  } = initVueI18n(messages);
  const _sfc_main$d = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        // 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      iconSize: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "",
            contentrefresh: "",
            contentnomore: ""
          };
        }
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        webviewHide: false,
        platform,
        imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZVHb98LM+F5bHL8khA1iSeiyQBCRM+YGqKUnnJTDLGI0BGZlKDIU2MMglUiDApEZvSsZnQtBRJtKwQNKQMFYeRDR10WOLd8ljYXdh+v8v5fR3Od+797t1dnOnO/Ofce77z+J//+b/P+ZqtXbs2sJ9MJhNUV1cHJ06cCJo3bx7EPc2aNcvpy7pWrVoF+/fvDyoqKoI2bdoE9fX1F7TjN8a+EXBn/fkfvw942Tf+wYMHg9mzZwfjxo0LDhw4EPa1x2MbFw/fOGfPng1qa2tzcCkILsLDydq2bRsunpOTMM7TD/W/tZDZhPdeKD+yGxHhdu3aBV27dg3OnDlzMVANMheLAO3btw8KCwuDmpoaX5OxbgUIMEq7K8IcPnw4KCsrC/r37x8cP378/4cAXAB3vqSkJMuiDhTkw+XcuXNhOWbMmKBly5YhUT8xArhyFvP0BfwRsAuwxJZJsm/nzp2DTp06he/OU+cZ64K6o0ePBkOHDg2GDx8e6gEbJ5Q/NHNuAJQ1hgBeHUDlR7nVTkY8rQAvAi4z34vR/mPs1FoRsaCgIJThI0eOBC1atEiFGGV+5MiRoS45efJkqFjJFXV1dQuA012m2WcwTw98fy6CqBdsaiIO4CScrGPHjvk4odhavPquRtFWXEC25VgkREKOCh/qDSq+vn37htzD/mZTOmOc5U7zKzBPEedygWshcDyWvs30igAbU+6oyMgJBCFhwQE0fccxN60Ay9iebbjoDh06hMowjQxT4fXq1SskArmHZpkArvixp/kWzHdMeArExSJEaiXIjjRjRJ4DaAGWpibLzXN3Fm1vA5teBgh3j1Rv3bp1YgKwPdmf2p9zcyNYYgPKMfY0T5f5nNYdw158nJ8QawW4CLKwiOBSEgO/hok2eBydR+3dYH+PLxA5J8Vv0KBBwenTp0P2JWAx6+yFEBfs8lMY+y0SWMBNI9E4ThKi58VKTg3FQZS1RQF1cz27eC0QHMu+3E0SkUowjhVt5VdaWhp07949ZHv2Qd1EjDXM2cla1M0nl3GxAs3J9yREzyTdFVKVFOaE9qRA8GM0WebRuo9JGZKA7Mv2SeS/Z8+eoQ9BArMfFrLGo6jvxbhHbJZnKX2Rzz1O7QhJJ9Cs2ZMaWIyq/zhdeqPNfIoHd58clIQD+JSXl4dKlyIAuBdVXZwFVWKspSSoxE++h8x4k3uCnEhE4I5KwRiFWGOU0QWKiCYLbdoRMRKAu2kQ9vkfLU6dOhX06NEjlH+yMRZSinnuyWnYosVcji8CEA/6Cg2JF+IIUBqnGKUTCNwtwBN4f89RiK1R96DEgO2o0NDmtEdvVFdVVYV+P3UAPUEs6GFwV3PHmXkD4vh74iDFJysVI/MlaQhwKeBNTLYX5VuA8T4/gZxA4MRGFxDB6R7OmYPfyykGRJbyie+XnGYnQIC/coH9+vULiYrxrkL9ZA9+0ykaHIfEpM7ge8TiJ2CsHYwyMfafAF1yCGBHYIbCVDjDjKt7BeB51D+LgQa6OkG7IDYEEtvQ7lnXLKLtLdLuJBpE4gPUXcW2+PkZwOex+4cGDhwYDBkyRL7/HFcEwUGPo/8uWRUpYnfxGHco8HkewLHLyYmAawAPuIFZxhOpDfJQ8gbUv41yORAptMWBNr6oqMhWird5+u+iHmBb2nhjDV7HWBNQTgK8y11l5NetWzc5ULscAtSj7nbNI0skhWeUZCc0W4nyH/jO4Vz0u1IeYhbk4AiwM6tjxIWByHsoZ9qcIBPJd/y+DwPfBESOmCa/QF3WiZHucLlEDpNxcNhmheEOPgdQNx6/VZFQzFZ5TN08AHXQt2Ii3EdyFuUsPtTcGPhW5iMiCNELvz+Gdn9huG4HUJaW/w3g0wxV0XaG7arG2WeKiUWYM4Y7GO5ezshTARbbWGw/DvXkpp/ivVvE0JVoMxN4rpGzJMhE5Pl+xlATsDIqikP9F9D2z3h9nOksEUFhK+qO4rcPkoalMQ/HqJLIyb3F3JdjrCcw1yZ8joyJLR5gCo54etlag7qIoeNh1N1BRYj3DTFJ0elotxPlVzkGuYAmL0VSJVGAJA41c4Z6A3BzTLfn0HYwYKEI6CUAMzZEWvLsIcQOo1AmmyyM72nHJCfYsogflGV6jEk9vyQZXSuq6w4c16NsGcGZbwOPr+H1RkOk2LEzjNepxQkihHSCQ4ynAYNRx2zMKV92CQMWqj8J0BRE8EShxRFN6YrfCRhC0x3r/Zm4IbQCcmJoV0kMamllccR6FjHqUC5F2R/wS2dcymOlfAKOS4KmzQb5cpNC2MC7JhVn5wjXoJ44rYhLh8n0eXOCorJxa7POjbSlCGVczr34/RsAmrcvo9s+wGp3tzVhntxiXiJ4nvEYb4FJkf0O8HocAePmLvCxnL0AORraVekJk6TYjDabRVXfRE2lCN1h6ZQRN1+InUbsCpKwoBZHh0dODN9JBCUffItXxEavTQkUtnfTVAplCWL3JISz29h4NjotnuSsQKJCk8dF+kJR6RARjrqFVmfPnj3ZbK8cIJ0msd6jgHPGtfVTQ8VLmlvh4mct9sobRmPic0DyDQQnx/NlfYUgyz59+oScsH379pAwXABD32nTpoUHIToESeI5mnbE/UqDdyLcafEBf2MCqgC7NwxIbMREJQ0g4D4sfJwnD+AmRrII05cfMWJE+L1169bQr+fip06dGp4oJ83lmYd5wj/EmMa4TaHivo4EeCguYZBnkB5g2aWA69OIEnUHOaGysjIYMGBAMGnSpODYsWPZwCpFmm4lNq+4gSLQA7jcX8DwtjEyRC8wjabnXEx9kfWnTJkSJkAo90xpJVV+FmcVNeYAF5zWngS4C4O91MBxmAv8blLEpbjI5sz9MTdAhcgkCT1RO8mZkAjfiYpTEvStAS53Uw1vAiUGgZ3GpuQEYvoiBqlIan7kSDHnTwJQFNiPu0+5VxCVYhcZIjNrdXUDdp+Eq5AZ3Gkg8QAyVZRZIk4Tl4QAbF9cXJxNYZMAtAokgs4BrNxEpCtteXg7DDTMDKYNSuQdKsnJBek7HxewvxaosWxLYXtw+cJp18217wql4aKCfBNoEu0O5VU+PhctJ0YeXD4C6JQpyrlpSLTojpGGGN5YwNziChdIZLk4lvLcFJ9jMX3QdiImY9bmGQU+TRUL5CHITTRlgF8D9ouD1MfmLoEPl5xokIumZ2cfgMpHt47IW9N64Hsh7wQYYjyIugWuF5fCqYncXRd5vPMWyizzvhi/32+nvG0dZc9vR6fZOu0md5e+uC408FvKSIOZwXlGvxPv95izA2Vtvg1xKFWARI+vMX66HUhpQQb643uW1bSjuTWyw2SBvDrBvjFic1eGGlz5esq3ko9uSIlBRqPuFcCv8F4WIcN12nVaBd0SaYwI6PDDImR11JkqgHcPmQssjxIn6bUshygDFJUTxPMpHk+jfjPgupgdnYV2R/g7xSjtpah8RJBewhwf0gGK6XI92u4wXFEU40afJ4DN4h5LcAd+40HI3JgJecuT0c062W0i2hQJUTcxan3/CMW1PF2K6bbA+Daz4xRs1D3Br1Cm0OihKCqizW78/nXAF/G5TXrEcVzaNMH6CyMswqsAHqDyDLEyou8lwOXnKF8DjI6KjV3KzMBiXkDH8ij/H214J5A596ekrZ3F0zXlWeL7+P5eUrNo3/QwC15uxthuzidy7DzKRwEDaAViiDgKbTbz7CJnzo0bN7pIfIiid8SuPwn25o3QCmpnyjlZkyxPP8EomCJzrGb7GJMx7tNsq4MT2xMUYaiErZOluTzKsnz3gwCeCZyVRZJfYplNEokEjwrPtxlxjeYAk+F1F74VAzPxQRNYYdtpOUvWs8J1sGhBJMNsb7igN8plJs1eSmLIhLKE4rvaCX27gOhLpLOsIzJ7qn/i+wZzcvSOZ23/du8TZjwV8zHIXoP4R3ifBxiFz1dcVpa3aPntPE+c6TmIWE9EtcMmAcPdWAhYhAXxcLOQi9L1WhD1Sc8p1d2oL7XGiRKp8F4A2i8K/nfI+y/gsTDJ/YC/8+AD5Uh04KHiGl+cIFPnBDDrPMjwRGkLXyxO4VGbfQWnDH2v0bVWE3C9QOXlepbgjEfIJQI6XDG3z5ahD9cw2pS78ipB85wyScNTvsVzlzzhL8/jRrnmVjfFJK/m3m4nj9vbgQTguT8XZTjsm672R5uJKEaQmBI/c58gyus8ZDagLpEVSJBIyHp4jn++xqPV71OgQgJYEWOtZ/haxRtKmWOBu8xdBLftWltsY84zE6WIEy/eIOWL+BaayMx+KHtL7EAkqdNDLiEXmEMUHniedtJqg9HmZtfvt26vNi0BdG3Ft3g8ZOf7PAu59TxtzivLNIekyi+wD1i8CuUiD9FXAa8C+/xS3JPmZnomyc7H+fb4/Se0bk41Fel621r4cgVxbq91V4jVqwB7HTe2M7jgB+QWHavZkDRPmZcASoZEmBx6i75bGjPcMdL4/VKGFAGWZkGzPG0XAbdL9A81G5LOmUnC9hHKJeO7dcUMjblSl12867ElFTtaGl20xvvLGPdVz/8TVuU7y0x1PG7vtNg24oz9Uo/Z412++VFWI7Fcog9tu9Lm6gvRmIPv9x1xmQAu6RDkXtbOtlGEmpgD5Nvnyc0dcv0EE6cfdi1HmhMf9wDF3k3gtRvEedhxjpgfqPb9PU9iEJHnyOUA7bQUXh6kq/D7l2iTjWv7XOD530BDr8jIrus+srXjt4MzumJMHuTsBa63YKE1+RR5lBjEikCCnWKWiHdzOgKO+nRIBAF88za/IFmJ3eMZov4CYxGBabcpGL8EYx+SeMXJeRwHNsV/h+vdxeuhEpN3ZyNY78Gm2fknJxVGhyjixPiQvVkNzT1elD9Py/aTAL64Hb9vcYmC9zfdXdT/C1LeGbg4rnBaAihDFJH12W5ulfNCNe/xTsP3bp8ikzJs5BF+5PNfAQYAPaseTdsEcaYAAAAASUVORK5CYII="
      };
    },
    computed: {
      iconSnowWidth() {
        return (Math.floor(this.iconSize / 24) || 1) * 2;
      },
      contentdownText() {
        return this.contentText.contentdown || t("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages2 = getCurrentPages();
      var page = pages2[pages2.length - 1];
      var currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--android-MP"
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--ios-H5"
        },
        [
          vue.createElementVNode("image", {
            src: $data.imgBase64,
            mode: "widthFix"
          }, null, 8, ["src"])
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 2,
          class: "uni-load-more__text",
          style: vue.normalizeStyle({ color: $props.color })
        },
        vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-9245e42c"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  const _sfc_main$c = {
    name: "uniDataChecklist",
    mixins: [Ys.mixinDatacom || {}],
    emits: ["input", "update:modelValue", "change"],
    props: {
      mode: {
        type: String,
        default: "default"
      },
      multiple: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      // TODO vue3
      modelValue: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      localdata: {
        type: Array,
        default() {
          return [];
        }
      },
      min: {
        type: [Number, String],
        default: ""
      },
      max: {
        type: [Number, String],
        default: ""
      },
      wrap: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: "left"
      },
      selectedColor: {
        type: String,
        default: ""
      },
      selectedTextColor: {
        type: String,
        default: ""
      },
      emptyText: {
        type: String,
        default: "暂无数据"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      map: {
        type: Object,
        default() {
          return {
            text: "text",
            value: "value"
          };
        }
      }
    },
    watch: {
      localdata: {
        handler(newVal) {
          this.range = newVal;
          this.dataList = this.getDataList(this.getSelectedValue(newVal));
        },
        deep: true
      },
      mixinDatacomResData(newVal) {
        this.range = newVal;
        this.dataList = this.getDataList(this.getSelectedValue(newVal));
      },
      value(newVal) {
        this.dataList = this.getDataList(newVal);
      },
      modelValue(newVal) {
        this.dataList = this.getDataList(newVal);
      }
    },
    data() {
      return {
        dataList: [],
        range: [],
        contentText: {
          contentdown: "查看更多",
          contentrefresh: "加载中",
          contentnomore: "没有更多"
        },
        isLocal: true,
        styles: {
          selectedColor: "#2979ff",
          selectedTextColor: "#666"
        },
        isTop: 0
      };
    },
    computed: {
      dataValue() {
        if (this.value === "")
          return this.modelValue;
        if (this.modelValue === "")
          return this.value;
        return this.value;
      }
    },
    created() {
      if (this.localdata && this.localdata.length !== 0) {
        this.isLocal = true;
        this.range = this.localdata;
        this.dataList = this.getDataList(this.getSelectedValue(this.range));
      } else {
        if (this.collection) {
          this.isLocal = false;
          this.loadData();
        }
      }
    },
    methods: {
      loadData() {
        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomResData = res.result.data;
          if (this.mixinDatacomResData.length === 0) {
            this.isLocal = false;
            this.mixinDatacomErrorMessage = this.emptyText;
          } else {
            this.isLocal = true;
          }
        }).catch((err) => {
          this.mixinDatacomErrorMessage = err.message;
        });
      },
      /**
       * 获取父元素实例
       */
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      change(e2) {
        const values = e2.detail.value;
        let detail = {
          value: [],
          data: []
        };
        if (this.multiple) {
          this.range.forEach((item) => {
            if (values.includes(item[this.map.value] + "")) {
              detail.value.push(item[this.map.value]);
              detail.data.push(item);
            }
          });
        } else {
          const range = this.range.find((item) => item[this.map.value] + "" === values);
          if (range) {
            detail = {
              value: range[this.map.value],
              data: range
            };
          }
        }
        this.$emit("input", detail.value);
        this.$emit("update:modelValue", detail.value);
        this.$emit("change", {
          detail
        });
        if (this.multiple) {
          this.dataList = this.getDataList(detail.value, true);
        } else {
          this.dataList = this.getDataList(detail.value);
        }
      },
      /**
       * 获取渲染的新数组
       * @param {Object} value 选中内容
       */
      getDataList(value) {
        let dataList = JSON.parse(JSON.stringify(this.range));
        let list = [];
        if (this.multiple) {
          if (!Array.isArray(value)) {
            value = [];
          }
        }
        dataList.forEach((item, index) => {
          item.disabled = item.disable || item.disabled || false;
          if (this.multiple) {
            if (value.length > 0) {
              let have = value.find((val) => val === item[this.map.value]);
              item.selected = have !== void 0;
            } else {
              item.selected = false;
            }
          } else {
            item.selected = value === item[this.map.value];
          }
          list.push(item);
        });
        return this.setRange(list);
      },
      /**
       * 处理最大最小值
       * @param {Object} list
       */
      setRange(list) {
        let selectList = list.filter((item) => item.selected);
        let min = Number(this.min) || 0;
        let max = Number(this.max) || "";
        list.forEach((item, index) => {
          if (this.multiple) {
            if (selectList.length <= min) {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have !== void 0) {
                item.disabled = true;
              }
            }
            if (selectList.length >= max && max !== "") {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have === void 0) {
                item.disabled = true;
              }
            }
          }
          this.setStyles(item, index);
          list[index] = item;
        });
        return list;
      },
      /**
       * 设置 class
       * @param {Object} item
       * @param {Object} index
       */
      setStyles(item, index) {
        item.styleBackgroud = this.setStyleBackgroud(item);
        item.styleIcon = this.setStyleIcon(item);
        item.styleIconText = this.setStyleIconText(item);
        item.styleRightIcon = this.setStyleRightIcon(item);
      },
      /**
       * 获取选中值
       * @param {Object} range
       */
      getSelectedValue(range) {
        if (!this.multiple)
          return this.dataValue;
        let selectedArr = [];
        range.forEach((item) => {
          if (item.selected) {
            selectedArr.push(item[this.map.value]);
          }
        });
        return this.dataValue.length > 0 ? this.dataValue : selectedArr;
      },
      /**
       * 设置背景样式
       */
      setStyleBackgroud(item) {
        let styles = {};
        let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
        if (this.selectedColor) {
          if (this.mode !== "list") {
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
          if (this.mode === "tag") {
            styles["background-color"] = item.selected ? selectedColor : "#f5f5f5";
          }
        }
        let classles = "";
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIcon(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          styles["background-color"] = item.selected ? selectedColor : "#fff";
          styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          if (!item.selected && item.disabled) {
            styles["background-color"] = "#F2F6FC";
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIconText(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          if (this.mode === "tag") {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : "#fff" : "#666";
          } else {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : selectedColor : "#666";
          }
          if (!item.selected && item.disabled) {
            styles.color = "#999";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleRightIcon(item) {
        let styles = {};
        let classles = "";
        if (this.mode === "list") {
          styles["border-color"] = item.selected ? this.styles.selectedColor : "#DCDFE6";
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-data-checklist",
        style: vue.normalizeStyle({ "margin-top": $data.isTop + "px" })
      },
      [
        !$data.isLocal ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-data-loading"
        }, [
          !_ctx.mixinDatacomErrorMessage ? (vue.openBlock(), vue.createBlock(_component_uni_load_more, {
            key: 0,
            status: "loading",
            iconType: "snow",
            iconSize: 18,
            "content-text": $data.contentText
          }, null, 8, ["content-text"])) : (vue.openBlock(), vue.createElementBlock(
            "text",
            { key: 1 },
            vue.toDisplayString(_ctx.mixinDatacomErrorMessage),
            1
            /* TEXT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            $props.multiple ? (vue.openBlock(), vue.createElementBlock(
              "checkbox-group",
              {
                key: 0,
                class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list" || $props.wrap }]),
                onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args))
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.dataList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "label",
                      {
                        class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
                        style: vue.normalizeStyle(item.styleBackgroud),
                        key: index
                      },
                      [
                        vue.createElementVNode("checkbox", {
                          class: "hidden",
                          hidden: "",
                          disabled: $props.disabled || !!item.disabled,
                          value: item[$props.map.value] + "",
                          checked: item.selected
                        }, null, 8, ["disabled", "value", "checked"]),
                        $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "checkbox__inner",
                            style: vue.normalizeStyle(item.styleIcon)
                          },
                          [
                            vue.createElementVNode("view", { class: "checkbox__inner-icon" })
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
                          },
                          [
                            vue.createElementVNode(
                              "text",
                              {
                                class: "checklist-text",
                                style: vue.normalizeStyle(item.styleIconText)
                              },
                              vue.toDisplayString(item[$props.map.text]),
                              5
                              /* TEXT, STYLE */
                            ),
                            $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 0,
                                class: "checkobx__list",
                                style: vue.normalizeStyle(item.styleBackgroud)
                              },
                              null,
                              4
                              /* STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              34
              /* CLASS, NEED_HYDRATION */
            )) : (vue.openBlock(), vue.createElementBlock(
              "radio-group",
              {
                key: 1,
                class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list", "is-wrap": $props.wrap }]),
                onChange: _cache[1] || (_cache[1] = (...args) => $options.change && $options.change(...args))
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.dataList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "label",
                      {
                        class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
                        style: vue.normalizeStyle(item.styleBackgroud),
                        key: index
                      },
                      [
                        vue.createElementVNode("radio", {
                          class: "hidden",
                          hidden: "",
                          disabled: $props.disabled || item.disabled,
                          value: item[$props.map.value] + "",
                          checked: item.selected
                        }, null, 8, ["disabled", "value", "checked"]),
                        $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "radio__inner",
                            style: vue.normalizeStyle(item.styleBackgroud)
                          },
                          [
                            vue.createElementVNode(
                              "view",
                              {
                                class: "radio__inner-icon",
                                style: vue.normalizeStyle(item.styleIcon)
                              },
                              null,
                              4
                              /* STYLE */
                            )
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
                          },
                          [
                            vue.createElementVNode(
                              "text",
                              {
                                class: "checklist-text",
                                style: vue.normalizeStyle(item.styleIconText)
                              },
                              vue.toDisplayString(item[$props.map.text]),
                              5
                              /* TEXT, STYLE */
                            ),
                            $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 0,
                                style: vue.normalizeStyle(item.styleRightIcon),
                                class: "checkobx__list"
                              },
                              null,
                              4
                              /* STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              34
              /* CLASS, NEED_HYDRATION */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-2f788efd"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue"]]);
  const _sfc_main$b = {
    name: "UniTitle",
    props: {
      type: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      color: {
        type: String,
        default: "#333333"
      },
      stat: {
        type: [Boolean, String],
        default: ""
      }
    },
    data() {
      return {};
    },
    computed: {
      textAlign() {
        let align = "center";
        switch (this.align) {
          case "left":
            align = "flex-start";
            break;
          case "center":
            align = "center";
            break;
          case "right":
            align = "flex-end";
            break;
        }
        return align;
      }
    },
    watch: {
      title(newVal) {
        if (this.isOpenStat()) {
          if (uni.report) {
            uni.report("title", this.title);
          }
        }
      }
    },
    mounted() {
      if (this.isOpenStat()) {
        if (uni.report) {
          uni.report("title", this.title);
        }
      }
    },
    methods: {
      isOpenStat() {
        if (this.stat === "") {
          this.isStat = false;
        }
        let stat_type = typeof this.stat === "boolean" && this.stat || typeof this.stat === "string" && this.stat !== "";
        if (this.type === "") {
          this.isStat = true;
          if (this.stat.toString() === "false") {
            this.isStat = false;
          }
        }
        if (this.type !== "") {
          this.isStat = true;
          if (stat_type) {
            this.isStat = true;
          } else {
            this.isStat = false;
          }
        }
        return this.isStat;
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-title__box",
        style: vue.normalizeStyle({ "align-items": $options.textAlign })
      },
      [
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["uni-title__base", ["uni-" + $props.type]]),
            style: vue.normalizeStyle({ "color": $props.color })
          },
          vue.toDisplayString($props.title),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_11 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-0335e46a"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-title/components/uni-title/uni-title.vue"]]);
  function GetDefaultThumbs(successCallback) {
    Get("/Api/Common/GetDefaultThumbs", auth, successCallback);
  }
  function GetHabitGroups(userId, successCallback) {
    Get(`/Api/Habit/GetHabitGroups/${userId}`, auth, successCallback);
  }
  function GetHabits(pageOption, userId, time, successCallback) {
    Get(`/Api/Habit/GetHabits/${userId}?page=${pageOption.current}&pageSize=${pageOption.size}&time=${time}`, auth, successCallback);
  }
  function CreateHabit(habit, successCallback) {
    Put("/Api/Habit/CreateHabit", auth, habit, successCallback);
    uni.removeStorageSync(HabitReminderKey);
  }
  function UpdateHabit(habit, successCallback) {
    Patch("/Api/Habit/UpdateHabit", auth, habit, successCallback);
  }
  function CreateGroup(userId, groupName, successCallback) {
    Post(`/Api/Habit/CreateGroup/${userId}?groupName=${groupName}`, auth, {}, successCallback);
  }
  function RemoveGroup(groupId, userId, code, successCallback) {
    Delete(`/Api/Habit/RemoveGroup/${userId}/${groupId}?code=${code}`, auth, successCallback);
  }
  function UploadThumb(thumb, habitId, originalFileName, successCallback) {
    const data = {
      habitId,
      originalFileName
    };
    UploadFile("/Api/Habit/UploadThumb", thumb, formDataAuth, data, successCallback);
  }
  function FinishOrNot(record, successCallback) {
    Patch("/Api/Habit/FinishOrNot", auth, record, successCallback);
  }
  function GetHabitReminders(habitId, successCallback) {
    Get(`/Api/Habit/GetHabitReminders/${habitId}`, auth, successCallback);
  }
  function RemoveHabit(habitId, successCallback) {
    Delete(`/Api/Habit/RemoveHabit/${habitId}`, auth, successCallback);
  }
  function DayInFrequency(habitId, day, habitBeginDate, successCallback) {
    Post(`/Api/Habit/DayInFrequency/${habitId}?day=${day}&habitBeginDate=${habitBeginDate}`, auth, {}, successCallback);
  }
  function GetHabitRecords(habitId, successCallback) {
    Get(`/Api/Habit/GetHabitRecords/${habitId}`, auth, successCallback);
  }
  function GetCurrentHabitReminders(userId, currentTime, successCallback) {
    Get(`/Api/Habit/GetCurrentHabitReminders/${userId}?currentTime=${currentTime.getTime()}`, auth, successCallback);
  }
  function FinishHabit(record) {
    FinishOrNot(record, (response) => {
      if (!response.data.succeeded) {
        uni.showToast({
          title: response.data.message,
          icon: "none"
        });
      }
    });
  }
  const _imports_4 = "/static/time.png";
  const _imports_1$2 = "/static/notifaction.png";
  const _imports_2$2 = "/static/group.png";
  const _imports_3$2 = "/static/frequency.png";
  const _sfc_main$a = {
    __name: "habit",
    setup(__props, { expose: __expose }) {
      __expose();
      const counter = vue.ref(null);
      const popup = vue.ref(null);
      const persistPopup = vue.ref(null);
      const thumbPopup = vue.ref(null);
      const groupPopup = vue.ref(null);
      const detailPopup = vue.ref(null);
      const recordPopup = vue.ref(null);
      const today2 = vue.ref(/* @__PURE__ */ new Date());
      const habitOption = vue.ref(new PageOption(1, 1e3, 0));
      const defaultThumbs = vue.ref([]);
      const pattern2 = vue.ref({
        color: "#7A7E83",
        backgroundColor: "yellow",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      });
      const state = vue.reactive({
        habit: {
          userId: "",
          thumb: "habit.png",
          name: "",
          beginDate: "",
          reminderModels: [],
          days: null,
          period: null,
          weekPersistDays: null,
          groupId: 1,
          description: "",
          aimDays: -1,
          recordDay: ""
        },
        groups: [],
        selectedDay: new Date(today2.value.setMilliseconds(0)),
        canAddHabit: false,
        isHabitUpdate: false,
        persistDays,
        persistDaysIndex: 0,
        frequency: {
          data: [new ValueText(0, "每周"), new ValueText(1, "每周几天"), new ValueText(2, "每隔几天")],
          selcection: 0,
          weekDays: [],
          selected: [0, 1, 2, 3, 4, 5, 6]
        },
        weekDays: [],
        dayNumbers: [],
        thumbChangeCancelled: true,
        thumbShow: "",
        selectedThumb: "",
        selectedImgFile: null,
        groupName: "",
        groupAdd: false,
        selectedHabit: null,
        groupCode: 1,
        data: {},
        optionMostCheck: false
      });
      vue.onMounted(() => {
        state.habit.beginDate = onlyDate(state.selectedDay);
        state.habit.userId = user == "" ? uni.getStorageSync("user").uid : user.uid;
        state.habit.recordDay = onlyDate(state.selectedDay);
        state.thumbShow = imgSrc(state.habit.thumb);
        fillWeekdays();
        for (let day of weekdays) {
          state.weekDays.push({
            key: day.key,
            value: day.value,
            text: day.text.substring(day.text.length - 1)
          });
        }
        for (let i2 = 1; i2 <= 99; i2++)
          state.dayNumbers.push(i2);
        getDefaultThumbs();
        getGroups();
        getData();
      });
      function reloadHabitModel() {
        state.habit.beginDate = onlyDate(state.selectedDay);
        state.habit.recordDay = onlyDate(state.selectedDay);
        state.habit.groupId = state.groups[0].id;
        state.habit.aimDays = -1;
        state.habit.name = "";
        state.habit.reminderModels = [];
        state.habit.priority = 4;
        state.habit.thumb = "habit.png";
        state.thumbShow = imgSrc(state.habit.thumb);
        state.thumbChangeCancelled = true;
        state.selectedImgFile = null;
        state.habit.userId = user == "" ? uni.getStorageSync("user").uid : user.uid;
        state.habit.description = "";
        state.habit.days = null;
        state.habit.weekPersistDays = null;
        state.habit.period = null;
        state.groupCode = 1;
        state.frequency.selcection = 0;
        state.frequency.selcected = [0, 1, 2, 3, 4, 5, 6];
        fillWeekdays();
      }
      function seeDetail(groupName, index) {
        state.selectedHabit = state.data[groupName][index];
        if (state.selectedDay.getTime() > today2.value.getTime() || state.selectedDay.getTime() < state.selectedHabit.beginDate.getTime())
          return;
        state.selectedHabit.index = index;
        state.thumbShow = imgSrc(state.selectedHabit.thumb);
        GetHabitReminders(state.selectedHabit.habitId, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          const reminders = res.data;
          for (let i2 = 0; i2 < reminders.length; i2++)
            reminders[i2].toDelete = false;
          state.selectedHabit.reminderModels = reminders;
          detailPopup.value.open();
        });
        GetHabitRecords(state.selectedHabit.habitId, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          for (let record of res.data)
            record.day = new Date(record.day);
          state.selectedHabit.records = res.data;
        });
      }
      function toEdit() {
        copy(state.selectedHabit, state.habit);
        state.groupCode = state.selectedHabit.groupCode;
        state.isHabitUpdate = true;
        if (state.selectedHabit.days != null) {
          state.frequency.selcection = 0;
          state.frequency.selected = [];
          for (let pro in state.selectedHabit.days)
            state.frequency.selected.push(state.selectedHabit.days[pro]);
        }
        if (state.selectedHabit.weekPersistDays != null)
          state.frequency.selcection = 1;
        if (state.selectedHabit.interval != null)
          state.frequency.selcection = 2;
        popup.value.open();
      }
      function habitNameInput(current) {
        state.canAddHabit = current.length > 0;
      }
      function dateChange(date) {
        state.selectedDay = onlyDate(date);
        getData();
      }
      function selectBeginDate(e2) {
        const value = e2.detail.value;
        state.habit.beginDate = new Date(value);
      }
      function editHabit() {
        if (!state.isHabitUpdate) {
          if (!state.canAddHabit)
            return;
          CreateHabit(state.habit, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
            } else {
              if (state.selectedImgFile == null) {
                afterCreating("", res.data, state.habit.thumb);
                return;
              }
              UploadThumb(state.selectedImgFile, res.data, null, (response1) => {
                const res1 = JSON.parse(response1.data);
                if (!res1.succeeded) {
                  uni.showToast({
                    title: res1.message,
                    icon: "none"
                  });
                  return;
                }
                afterCreating(res.message, res.data, res1.data);
              });
            }
          });
        } else {
          UpdateHabit(state.habit, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
              return;
            }
            if (state.selectedImgFile == null)
              afterUpdating(res.data);
            else {
              UploadThumb(
                state.selectedImgFile,
                state.selectedHabit.habitId,
                state.habit.thumb,
                (response1) => {
                  const res1 = JSON.parse(response1.data);
                  if (!res1.succeeded) {
                    uni.showToast({
                      title: res.message,
                      icon: "none"
                    });
                    return;
                  }
                  res.data.thumb = res1.data;
                  afterUpdating(res.data);
                }
              );
            }
          });
        }
      }
      function afterCreating(msg, habitId, thumb) {
        loading(msg, () => {
          const item = {
            habitId,
            name: state.habit.name,
            thumb,
            persistDays: 0,
            groupName: state.groups.filter((g2) => g2.id == state.habit.groupId)[0].name,
            beginDate: state.task.beginDate
          };
          if (habitOption.value.data.length < habitOption.value.size) {
            habitOption.value.data.push(item);
            if (state.data[item.groupName] == void 0)
              state.data[item.groupName] = [item];
            else
              state.data[item.groupName].push(item);
          }
          popup.value.close();
        }, 750);
      }
      function afterUpdating(data) {
        data.beginDate = new Date(data.beginDate);
        const index = state.selectedHabit.index;
        state.selectedHabit = data;
        const groupName = state.groups.filter((g2) => g2.id == state.selectedHabit.groupId)[0].name;
        state.data[groupName][index] = data;
        loading("", () => popup.value.close(), 500);
      }
      function openToEdit() {
        popup.value.open();
      }
      function closePopup() {
        popup.value.close();
        reloadHabitModel();
      }
      function takeGroup(group) {
        state.habit.groupId = group.id;
        state.groupCode = group.code;
      }
      function getData() {
        GetHabits(habitOption.value, state.habit.userId, state.selectedDay.getTime(), (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
          habitOption.value.data = res.data.data;
          habitOption.value.total = res.data.total;
          dataReogrized();
        });
      }
      function getGroups() {
        GetHabitGroups(state.habit.userId, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          state.groups = res.data;
          state.habit.groupId = state.groups[0].id;
        });
      }
      function getDefaultThumbs() {
        GetDefaultThumbs((response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          defaultThumbs.value = res.data;
        });
      }
      function popupClose(e2) {
        if (e2.show)
          return;
        reloadHabitModel();
      }
      function setReminderTime(e2, reminder) {
        const value = e2.detail.value;
        reminder.time = value;
      }
      function removeReminder(index) {
        if (state.isHabitUpdate)
          state.habit.reminderModels[index].toDelete = true;
        else
          state.habit.reminderModels.splice(index, 1);
      }
      function editReminderTime(e2) {
        const value = e2.detail.value;
        const habitId = state.isHabitUpdate ? state.selectedHabit.habitId : null;
        const data = state.habit.reminderModels;
        if (data.length == 0)
          data.push(new HabitReminder(value, habitId));
        else {
          var i2;
          const index = data.findIndex((r2) => r2.time == value);
          for (i2 = 0; i2 < data.length; i2++) {
            const dateStr = `${state.selectedDay.getFullYear()}-${state.selectedDay.getMonth() + 1}-${state.selectedDay.getDate()} `;
            const date = new Date(dateStr + value);
            const current = new Date(dateStr + data[i2].time);
            if (date.getTime() < current.getTime() && index < 0) {
              data.splice(i2, 0, new HabitReminder(value, habitId));
              break;
            }
          }
          if (i2 == data.length && index < 0)
            data.push(new HabitReminder(value, habitId));
        }
      }
      function takeAimDays(item) {
        state.habit.aimDays = state.persistDays[item.value].key;
        persistPopup.value.close();
      }
      function thumbPopupClose(e2) {
        if (e2.show || !state.thumbChangeCancelled)
          return;
        state.habit.thumb = "habit.png";
        state.habit.description = "";
        state.thumbShow = imgSrc(state.habit.thumb);
        state.selectedImgFile = null;
      }
      function selectAsThumb(thumb) {
        state.selectedThumb = thumb.value;
        state.thumbShow = imgSrc(thumb.value);
        if (state.habit.description.length == 0)
          state.habit.description = thumb.text;
      }
      function takeDays(e2) {
        const value = e2.detail.value;
        const days = /* @__PURE__ */ new Map();
        for (let i2 = 0; i2 < value.length; i2++) {
          days[weekdays[value[i2]].key] = weekdays[value[i2]].value;
        }
        state.habit.days = days;
      }
      function resetSomeData() {
        if (state.frequency.selcection == 0) {
          if (!state.isHabitUpdate) {
            fillWeekdays();
            state.frequency.selected = [0, 1, 2, 3, 4, 5, 6];
          } else {
            state.frequency.selected = [];
            for (let pro in state.selectedHabit.days)
              state.frequency.selected.push(state.selectedHabit.days[pro]);
          }
          state.habit.weekPersistDays = null;
          state.habit.period = null;
        } else if (state.frequency.selcection == 1) {
          if (state.isHabitUpdate)
            state.habit.weekPersistDays = state.selectedHabit.weekPersistDays;
          state.habit.days = null;
          state.habit.period = null;
        } else {
          if (state.isHabitUpdate)
            state.habit.period = state.selectedHabit.period;
          state.habit.days = null;
          state.habit.weekPersistDays = null;
        }
      }
      function fillWeekdays() {
        const days = /* @__PURE__ */ new Map();
        for (let i2 = 0; i2 < weekdays.length; i2++)
          days[weekdays[i2].key] = weekdays[i2].value;
        state.habit.days = days;
      }
      function takeWeekPersistDays(e2) {
        state.habit.weekPersistDays = e2.detail.value[0] + 1;
      }
      function takePeriod(e2) {
        state.habit.period = e2.detail.value[0] + 1;
      }
      function takeHabitThumb() {
        state.thumbChangeCancelled = false;
        if (state.selectedThumb.length > 0)
          state.habit.thumb = state.selectedThumb;
        thumbPopup.value.close();
      }
      function toUpload() {
        uni.chooseImage({
          count: 1,
          success: (result) => {
            const fileUrl = result.tempFilePaths[0];
            state.thumbShow = fileUrl;
            state.selectedImgFile = fileUrl;
          }
        });
      }
      function finishHabit(e2) {
        const finished = e2.finished;
        const model = {
          habitId: state.selectedHabit.habitId,
          finishTime: /* @__PURE__ */ new Date(),
          finished,
          day: onlyDate(state.selectedDay)
        };
        if (!model.finished && !state.selectedHabit.finished)
          return;
        FinishOrNot(model, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          state.selectedHabit.finished = finished;
          state.selectedHabit.finishTime = model.finishTime;
          recordFinish(res.data);
        });
      }
      function unfinishHabit(e2, habit) {
        e2.stopPropagation();
        FinishOrNot({
          habitId: habit.habitId,
          finished: false,
          day: onlyDate(state.selectedDay)
        }, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          habit.finished = false;
          recordFinish(res.data);
        });
      }
      function removeHabit() {
        RemoveHabit(state.selectedHabit.habitId, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          habitOption.value.data.splice(state.selectedHabit.index, 1);
        });
      }
      function openRecord() {
        recordPopup.value.open();
      }
      function dataReogrized() {
        const data = habitOption.value.data;
        state.data = {};
        for (let datum of data) {
          datum.beginDate = new Date(datum.beginDate);
          datum.finishTime = new Date(datum.finishTime);
          const groupName = datum.groupName;
          if (state.data[groupName] != void 0)
            state.data[groupName].push(datum);
          else {
            state.data[groupName] = [datum];
          }
        }
      }
      function recordFinish(data) {
        state.selectedHabit.persistDays = data.persistDays;
        state.selectedHabit.mostDays = data.mostDays;
        state.selectedHabit.continuousDays = data.continuousDays;
      }
      const __returned__ = { counter, popup, persistPopup, thumbPopup, groupPopup, detailPopup, recordPopup, today: today2, habitOption, defaultThumbs, pattern: pattern2, state, reloadHabitModel, seeDetail, toEdit, habitNameInput, dateChange, selectBeginDate, editHabit, afterCreating, afterUpdating, openToEdit, closePopup, takeGroup, getData, getGroups, getDefaultThumbs, popupClose, setReminderTime, removeReminder, editReminderTime, takeAimDays, thumbPopupClose, selectAsThumb, takeDays, resetSomeData, fillWeekdays, takeWeekPersistDays, takePeriod, takeHabitThumb, toUpload, finishHabit, unfinishHabit, removeHabit, openRecord, dataReogrized, recordFinish, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, get HabitReminder() {
        return HabitReminder;
      }, get PageOption() {
        return PageOption;
      }, get ValueText() {
        return ValueText;
      }, get copy() {
        return copy;
      }, get getDateStr() {
        return getDateStr;
      }, get loading() {
        return loading;
      }, get onlyDate() {
        return onlyDate;
      }, get persistDays() {
        return persistDays;
      }, get timeWithoutSeconds() {
        return timeWithoutSeconds;
      }, get weekdays() {
        return weekdays;
      }, get getDateTimeStr() {
        return getDateTimeStr;
      }, get CalendarDisplayWay() {
        return CalendarDisplayWay;
      }, get dateEquals() {
        return dateEquals;
      }, get invalidEvent() {
        return invalidEvent;
      }, get user() {
        return user;
      }, get CreateGroup() {
        return CreateGroup;
      }, get CreateHabit() {
        return CreateHabit;
      }, get FinishOrNot() {
        return FinishOrNot;
      }, get GetDefaultThumbs() {
        return GetDefaultThumbs;
      }, get GetHabitGroups() {
        return GetHabitGroups;
      }, get GetHabitRecords() {
        return GetHabitRecords;
      }, get GetHabitReminders() {
        return GetHabitReminders;
      }, get GetHabits() {
        return GetHabits;
      }, get RemoveHabit() {
        return RemoveHabit;
      }, get UpdateHabit() {
        return UpdateHabit;
      }, get UploadThumb() {
        return UploadThumb;
      }, get imgSrc() {
        return imgSrc;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_k_calendar = vue.resolveComponent("k-calendar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    const _component_uni_swipe_action_item = resolveEasycom(vue.resolveDynamicComponent("uni-swipe-action-item"), __easycom_1$3);
    const _component_uni_swipe_action = resolveEasycom(vue.resolveDynamicComponent("uni-swipe-action"), __easycom_2$1);
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_3);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_4);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_1$5);
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    const _component_uni_tag = resolveEasycom(vue.resolveDynamicComponent("uni-tag"), __easycom_8);
    const _component_k_radio_group = vue.resolveComponent("k-radio-group");
    const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_5);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2);
    const _component_uni_title = resolveEasycom(vue.resolveDynamicComponent("uni-title"), __easycom_11);
    const _component_k_habit_group = vue.resolveComponent("k-habit-group");
    const _component_k_swiper = vue.resolveComponent("k-swiper");
    const _component_k_record_month = vue.resolveComponent("k-record-month");
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock("view", { id: "habit" }, [
      vue.createVNode(_component_k_calendar, {
        unchangable: true,
        onOnChange: $setup.dateChange,
        style: { "top": "4vh", "height": "120px" }
      }),
      vue.createElementVNode("scroll-view", {
        class: "content",
        "scroll-y": true
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.state.data, (data, groupName) => {
            return vue.openBlock(), vue.createBlock(
              _component_uni_collapse,
              {
                class: "habit",
                key: groupName
              },
              {
                default: vue.withCtx(() => [
                  vue.createVNode(
                    _component_uni_collapse_item,
                    {
                      "title-border": "none",
                      "show-animation": false
                    },
                    {
                      title: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "display": "flex", "align-items": "center", "justify-content": "space-between" } }, [
                          vue.createElementVNode(
                            "text",
                            { class: "title-text" },
                            vue.toDisplayString(groupName),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { style: { "font-size": "12px", "color": "gray" } },
                            vue.toDisplayString(data.length),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      default: vue.withCtx(() => [
                        vue.createElementVNode("scroll-view", {
                          "scroll-y": true,
                          style: { "max-height": "30vh", "height": "fit-content" }
                        }, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(data, (habit, index) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                style: { "display": "flex", "flex-flow": "column nowrap" },
                                key: index
                              }, [
                                vue.createVNode(
                                  _component_uni_swipe_action,
                                  null,
                                  {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_uni_swipe_action_item, {
                                        disabled: habit.finished
                                      }, {
                                        right: vue.withCtx(() => [
                                          vue.createElementVNode("view", {
                                            class: "finishBtn",
                                            onClick: vue.withModifiers(($event) => {
                                              $setup.state.selectedHabit = habit;
                                              $setup.finishHabit({ finished: true });
                                            }, ["stop"])
                                          }, "完成", 8, ["onClick"])
                                        ]),
                                        default: vue.withCtx(() => [
                                          vue.createElementVNode("view", {
                                            style: { "display": "flex", "justify-content": "space-between" },
                                            onClick: ($event) => $setup.seeDetail(groupName, index)
                                          }, [
                                            vue.createElementVNode("view", { class: "info" }, [
                                              vue.createElementVNode("image", {
                                                src: $setup.imgSrc(habit.thumb),
                                                style: { "width": "40px", "height": "40px", "border-radius": "50%" }
                                              }, null, 8, ["src"]),
                                              vue.createElementVNode(
                                                "text",
                                                { style: { "margin-left": "3px", "text-wrap": "nowrap", "text-overflow": "ellipsis" } },
                                                vue.toDisplayString(habit.name),
                                                1
                                                /* TEXT */
                                              )
                                            ]),
                                            !$setup.state.optionMostCheck ? (vue.openBlock(), vue.createElementBlock("view", {
                                              key: 0,
                                              class: "option",
                                              onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => $setup.state.optionMostCheck = true, ["stop"]))
                                            }, [
                                              vue.createElementVNode(
                                                "text",
                                                null,
                                                vue.toDisplayString(habit.persistDays) + "天",
                                                1
                                                /* TEXT */
                                              ),
                                              vue.createElementVNode("text", null, "共坚持")
                                            ])) : vue.createCommentVNode("v-if", true),
                                            $setup.state.optionMostCheck ? (vue.openBlock(), vue.createElementBlock("view", {
                                              key: 1,
                                              class: "option",
                                              onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => $setup.state.optionMostCheck = false, ["stop"]))
                                            }, [
                                              vue.createElementVNode(
                                                "text",
                                                null,
                                                vue.toDisplayString(habit.mostDays) + "天",
                                                1
                                                /* TEXT */
                                              ),
                                              vue.createElementVNode("text", null, "最多连续")
                                            ])) : vue.createCommentVNode("v-if", true)
                                          ], 8, ["onClick"]),
                                          habit.finished ? (vue.openBlock(), vue.createElementBlock("view", {
                                            key: 0,
                                            class: "finish"
                                          }, [
                                            vue.createElementVNode(
                                              "text",
                                              { style: { "font-weight": "normal", "font-size": "14px", "color": "blue", "margin-left": "4px", "margin-right": "4px" } },
                                              vue.toDisplayString($setup.dateEquals(habit.finishTime, $setup.state.selectedDay) ? $setup.timeWithoutSeconds(habit.finishTime) : $setup.getDateStr(habit.finishTime)) + "  完成",
                                              1
                                              /* TEXT */
                                            ),
                                            vue.createElementVNode("text", {
                                              onClick: ($event) => $setup.unfinishHabit($event, habit)
                                            }, [
                                              vue.createVNode(_component_uni_icons, {
                                                type: "close",
                                                color: "red",
                                                size: 20
                                              })
                                            ], 8, ["onClick"])
                                          ])) : vue.createCommentVNode("v-if", true)
                                        ]),
                                        _: 2
                                        /* DYNAMIC */
                                      }, 1032, ["disabled"])
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                )
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createVNode(
        _component_uni_popup,
        {
          type: "right",
          ref: "popup",
          "background-color": "#fff",
          style: { "z-index": "101" },
          onChange: $setup.popupClose
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("scroll-view", {
              class: "habit-edit",
              "scroll-y": "true"
            }, [
              vue.createElementVNode("view", { class: "header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "left",
                  onClick: $setup.closePopup,
                  class: "close",
                  size: 25
                }),
                vue.createElementVNode(
                  "text",
                  { style: { "font-weight": "600" } },
                  vue.toDisplayString($setup.state.isHabitUpdate ? "习惯内容更新" : "添加新习惯"),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_uni_icons, {
                  type: "checkmarkempty",
                  style: vue.normalizeStyle($setup.state.canAddHabit || $setup.state.isHabitUpdate ? "" : "color:lightgray"),
                  size: 25,
                  class: "create",
                  onClick: $setup.editHabit
                }, null, 8, ["style"])
              ]),
              vue.createElementVNode("view", { class: "habit-item" }, [
                vue.createElementVNode("view", null, [
                  vue.createVNode(_component_uni_icons, {
                    type: "info",
                    size: 20
                  }),
                  vue.createElementVNode("text", null, "习惯图标与名称")
                ]),
                vue.createElementVNode("view", { class: "info" }, [
                  vue.createElementVNode("image", {
                    style: { "width": "30px", "height": "30px", "border-radius": "50%" },
                    src: $setup.state.thumbShow,
                    onClick: _cache[2] || (_cache[2] = ($event) => {
                      $setup.thumbPopup.open();
                    })
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { style: { "width": "40%", "margin-left": "3px" } }, [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $setup.state.habit.name,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.state.habit.name = $event),
                      placeholder: "习惯名称",
                      onInput: $setup.habitNameInput
                    }, null, 8, ["modelValue"])
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "habit-item" }, [
                vue.createVNode(_component_uni_list, {
                  border: true,
                  style: { "width": "96%" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_list_item, null, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "between" }, [
                          vue.createElementVNode("view", { class: "info" }, [
                            vue.createElementVNode("image", {
                              src: _imports_4,
                              style: { "height": "25px", "width": "25px" }
                            }),
                            vue.createElementVNode("text", null, "开始日期")
                          ]),
                          vue.createElementVNode(
                            "picker",
                            {
                              mode: "date",
                              fields: "year month day",
                              onChange: $setup.selectBeginDate
                            },
                            vue.toDisplayString($setup.getDateStr($setup.state.habit.beginDate)),
                            33
                            /* TEXT, NEED_HYDRATION */
                          )
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                      body: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "between" }, [
                          vue.createElementVNode("view", { class: "info" }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "medal",
                              size: 30
                            }),
                            vue.createElementVNode("text", null, "坚持天数")
                          ]),
                          $setup.state.persistDaysIndex != $setup.state.persistDays.length ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 0,
                              onClick: _cache[4] || (_cache[4] = ($event) => $setup.persistPopup.open())
                            },
                            vue.toDisplayString($setup.state.persistDays[$setup.state.persistDaysIndex].text),
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true),
                          $setup.state.persistDaysIndex == $setup.state.persistDays.length ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 1,
                              onClick: _cache[5] || (_cache[5] = ($event) => $setup.persistPopup.open())
                            },
                            vue.toDisplayString($setup.state.habit.aimDays) + "天 ",
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true)
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              vue.createElementVNode("view", { class: "habit-item" }, [
                vue.createElementVNode("view", { class: "center" }, [
                  vue.createElementVNode("image", {
                    src: _imports_1$2,
                    class: "img"
                  }),
                  vue.createElementVNode("text", { class: "notify-text" }, "提醒")
                ]),
                vue.createElementVNode("scroll-view", {
                  class: "group",
                  "scroll-x": true
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.state.habit.reminderModels, (reminder, index) => {
                      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
                        key: index,
                        class: "group-item"
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "closeempty",
                          size: 10,
                          class: "remove-reminder",
                          color: "red",
                          onClick: ($event) => $setup.removeReminder(index)
                        }, null, 8, ["onClick"]),
                        vue.createElementVNode("picker", {
                          mode: "time",
                          onChange: ($event) => $setup.setReminderTime($event, reminder),
                          value: $setup.timeWithoutSeconds($setup.state.selectedDay)
                        }, vue.toDisplayString(reminder.time), 41, ["onChange", "value"])
                      ])), [
                        [vue.vShow, !reminder.toDelete]
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  vue.createElementVNode("view", { class: "extra" }, [
                    vue.createElementVNode("picker", {
                      mode: "time",
                      onChange: $setup.editReminderTime,
                      value: $setup.timeWithoutSeconds(/* @__PURE__ */ new Date())
                    }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "plusempty",
                        color: "rgb(0,75,235)"
                      }),
                      vue.createElementVNode("text", null, "提醒")
                    ], 40, ["value"])
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "habit-item" }, [
                vue.createElementVNode("view", {
                  class: "center",
                  style: { "position": "relative" }
                }, [
                  vue.createElementVNode("image", {
                    src: _imports_2$2,
                    class: "img"
                  }),
                  vue.createElementVNode("text", { class: "notify-text" }, "分组"),
                  vue.createVNode(_component_uni_icons, {
                    type: "plusempty",
                    class: "add",
                    onClick: _cache[6] || (_cache[6] = ($event) => $setup.groupPopup.open())
                  })
                ]),
                vue.createCommentVNode("大坑，水平滚动需要设置enable-flex:true,子元素使用行内块元素"),
                vue.createElementVNode("scroll-view", {
                  class: "group",
                  "scroll-x": true,
                  "enable-flex": true
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.state.groups, (group, index) => {
                      return vue.openBlock(), vue.createBlock(_component_uni_tag, {
                        inverted: $setup.state.groupCode != group.code,
                        type: "primary",
                        style: { "margin-left": "4px", "font-size": "15px", "display": "inline-block" },
                        text: group.name,
                        key: index,
                        onClick: ($event) => $setup.takeGroup(group)
                      }, null, 8, ["inverted", "text", "onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { class: "frequecnySet" }, [
                vue.createElementVNode("view", { class: "frequency" }, [
                  vue.createElementVNode("image", {
                    src: _imports_3$2,
                    class: "img"
                  }),
                  vue.createElementVNode("text", {
                    class: "notify-text",
                    style: { "margin-left": "4px" }
                  }, "频率设置")
                ]),
                vue.createVNode(_component_k_radio_group, {
                  data: $setup.state.frequency.data,
                  modelValue: $setup.state.frequency.selcection,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.state.frequency.selcection = $event),
                  onOnChange: $setup.resetSomeData
                }, null, 8, ["data", "modelValue"]),
                $setup.state.frequency.selcection == 0 ? (vue.openBlock(), vue.createBlock(_component_uni_data_checkbox, {
                  key: 0,
                  mode: "tag",
                  localdata: $setup.state.weekDays,
                  onChange: $setup.takeDays,
                  multiple: true,
                  modelValue: $setup.state.frequency.selected,
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.state.frequency.selected = $event)
                }, null, 8, ["localdata", "modelValue"])) : vue.createCommentVNode("v-if", true),
                $setup.state.frequency.selcection == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "picker"
                }, [
                  vue.createElementVNode("text", null, "每周"),
                  vue.createElementVNode("picker-view", {
                    onChange: $setup.takeWeekPersistDays,
                    style: { "height": "100%", "width": "30px" },
                    value: [!$setup.state.isHabitUpdate ? 0 : $setup.state.habit.weekPersistDays - 1]
                  }, [
                    vue.createElementVNode("picker-view-column", null, [
                      (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList([1, 2, 3, 4, 5, 6, 7], (number, index) => {
                          return vue.createElementVNode(
                            "view",
                            {
                              key: index,
                              class: "picker-inner"
                            },
                            vue.toDisplayString(number),
                            1
                            /* TEXT */
                          );
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])
                  ], 40, ["value"]),
                  vue.createElementVNode("text", null, "天")
                ])) : vue.createCommentVNode("v-if", true),
                $setup.state.frequency.selcection == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "picker"
                }, [
                  vue.createElementVNode("text", null, "每"),
                  vue.createElementVNode("picker-view", {
                    onChange: $setup.takePeriod,
                    style: { "height": "100%", "width": "30px" },
                    value: [!$setup.state.isHabitUpdate ? 0 : $setup.state.habit.period - 1]
                  }, [
                    vue.createElementVNode("picker-view-column", null, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($setup.state.dayNumbers, (number, index) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "view",
                            {
                              key: index,
                              class: "picker-inner"
                            },
                            vue.toDisplayString(number),
                            1
                            /* TEXT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ], 40, ["value"]),
                  vue.createElementVNode("text", null, "天")
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "habit-item" }, [
                vue.createElementVNode("view", { style: { "margin-bottom": "3px" } }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "bars",
                    size: 20
                  }),
                  vue.createElementVNode("text", null, "习惯描述语")
                ]),
                vue.createVNode(_component_uni_easyinput, {
                  type: "textarea",
                  modelValue: $setup.state.habit.description,
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.state.habit.description = $event),
                  rows: 3
                }, null, 8, ["modelValue"])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          type: "center",
          "background-color": "#fff",
          ref: "persistPopup",
          style: { "z-index": "101" }
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "padding": "1%", "width": "65vw" } }, [
              vue.createVNode(_component_k_radio_group, {
                data: $setup.state.persistDays,
                modelValue: $setup.state.persistDaysIndex,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.state.persistDaysIndex = $event),
                onOnChange: $setup.takeAimDays,
                containDef: true,
                style: { "width": "96%" }
              }, null, 8, ["data", "modelValue"]),
              $setup.state.persistDaysIndex == $setup.state.persistDays.length ? (vue.openBlock(), vue.createBlock(_component_uni_easyinput, {
                key: 0,
                placeholder: "1-1000",
                modelValue: $setup.state.habit.aimDays,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.state.habit.aimDays = $event),
                type: "number",
                maxlength: "4",
                onChange: _ctx.takePersistDays,
                style: { "margin-top": "5px", "margin-bottom": "5px", "width": "96%" }
              }, null, 8, ["modelValue", "onChange"])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          type: "center",
          "background-color": "#fff",
          ref: "thumbPopup",
          style: { "z-index": "101" },
          onChange: $setup.thumbPopupClose,
          "border-radius": "10px 10px 10px 10px"
        },
        {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_title, {
              type: "h4",
              title: "习惯图标"
            }),
            vue.createElementVNode("view", { class: "thumb-content" }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("image", {
                  class: "thumb",
                  src: $setup.state.thumbShow,
                  style: { "width": "42px", "height": "42px" }
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "thumbs" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.defaultThumbs, (thumb, index) => {
                    return vue.openBlock(), vue.createElementBlock("image", {
                      class: "thumb",
                      key: index,
                      src: $setup.imgSrc(thumb.value),
                      onClick: ($event) => $setup.selectAsThumb(thumb)
                    }, null, 8, ["src", "onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("view", null, [
                vue.createVNode(_component_uni_tag, {
                  type: "primary",
                  text: "上传图片",
                  onClick: $setup.toUpload
                })
              ]),
              vue.createElementVNode("view", { class: "func-text" }, [
                vue.createElementVNode("text", {
                  onClick: $setup.takeHabitThumb,
                  style: { "margin-right": "10px" }
                }, "确定"),
                vue.createElementVNode("text", {
                  onClick: _cache[12] || (_cache[12] = ($event) => {
                    $setup.thumbPopup.close();
                  })
                }, "取消")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          type: "right",
          "background-color": "#fff",
          ref: "groupPopup",
          style: { "z-index": "101" }
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "header" }, [
              vue.createVNode(_component_uni_icons, {
                type: "left",
                onClick: _cache[13] || (_cache[13] = ($event) => $setup.groupPopup.close()),
                class: "close",
                size: 25
              }),
              vue.createElementVNode("text", { style: { "font-weight": "600" } }, "习惯分组"),
              vue.createElementVNode("view", { style: { "width": "40px" } })
            ]),
            vue.createVNode(_component_k_habit_group, {
              modelValue: $setup.state.groups,
              "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.state.groups = $event)
            }, null, 8, ["modelValue"])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "detailPopup",
          type: "right",
          "background-color": "#fff"
        },
        {
          default: vue.withCtx(() => [
            $setup.state.selectedHabit != null ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "detail"
            }, [
              vue.createElementVNode("view", { class: "header" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "arrow-left",
                  size: 25,
                  onClick: _cache[15] || (_cache[15] = ($event) => $setup.detailPopup.close())
                }),
                vue.createElementVNode("view", { style: { "margin-right": "7px" } }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "trash",
                    size: 25,
                    onClick: $setup.removeHabit
                  }),
                  vue.createVNode(_component_uni_icons, {
                    type: "compose",
                    size: 25,
                    onClick: $setup.toEdit
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "detail-content" }, [
                $setup.state.selectedHabit.finished ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  style: { "width": "90%", "text-align": "right", "color": "red" }
                }, "已完成")) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("image", {
                  class: "background",
                  src: $setup.imgSrc($setup.state.selectedHabit.thumb)
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "detail-option" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "detail-title" },
                    vue.toDisplayString($setup.state.selectedHabit.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", {
                    class: "detail-descritpion",
                    innerHTML: $setup.state.selectedHabit.description
                  }, null, 8, ["innerHTML"]),
                  !$setup.state.selectedHabit.finished ? (vue.openBlock(), vue.createBlock(_component_k_swiper, {
                    key: 0,
                    onFinish: $setup.finishHabit,
                    height: 60
                  })) : vue.createCommentVNode("v-if", true),
                  $setup.state.selectedHabit.finished ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "content-show"
                  }, [
                    vue.createElementVNode("view", { class: "show-content" }, [
                      vue.createElementVNode("text", null, "当前坚持"),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString($setup.state.selectedHabit.continuousDays) + "天",
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "show-content" }, [
                      vue.createElementVNode("text", null, "最多坚持"),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString($setup.state.selectedHabit.mostDays) + "天",
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "show-content" }, [
                      vue.createElementVNode("text", null, "已坚持"),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString($setup.state.selectedHabit.persistDays) + "天",
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("text", {
                  onClick: $setup.openRecord,
                  class: "open-record"
                }, "习惯记录详情")
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "recordPopup",
          "background-color": "aliceblue",
          type: "right"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "record" }, [
              vue.createElementVNode("view", {
                class: "header",
                style: { "width": "98%" }
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "arrow-left",
                  size: 25,
                  onClick: _cache[16] || (_cache[16] = ($event) => $setup.recordPopup.close())
                })
              ]),
              vue.createVNode(_component_k_record_month, {
                class: "record-calendar",
                modelValue: $setup.state.selectedHabit.records,
                "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.state.selectedHabit.records = $event),
                current: $setup.state.selectedDay,
                habitId: $setup.state.selectedHabit.habitId,
                beginDate: $setup.state.selectedHabit.beginDate,
                onSelect: $setup.recordFinish,
                continuousDays: $setup.state.selectedHabit.continuousDays,
                mostDays: $setup.state.selectedHabit.mostDays,
                persistDays: $setup.state.selectedHabit.persistDays,
                frequency: {
                  days: $setup.state.selectedHabit.days,
                  weekPersistDays: $setup.state.selectedHabit.weekPersistDays,
                  period: $setup.state.selectedHabit.period
                }
              }, null, 8, ["modelValue", "current", "habitId", "beginDate", "continuousDays", "mostDays", "persistDays", "frequency"])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(_component_uni_fab, {
        vertical: "bottom",
        pattern: $setup.pattern,
        "pop-menu": false,
        horizontal: "right",
        onFabClick: $setup.openToEdit
      }, null, 8, ["pattern"])
    ]);
  }
  const PagesHabit = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-61768113"], ["__file", "D:/repos/html+css+js/SelfSchedule/pages/habit.vue"]]);
  function UpdateTask(task, successCallback) {
    Post("/Api/FourQuadrants/UpdateTask", auth, task, successCallback);
  }
  function GetTasks(userId, time, successCallback) {
    Get(`/Api/FourQuadrants/GetTasks/${userId}?time=${time.getTime()}`, auth, successCallback);
  }
  function ChangePriority(task, successCallback) {
    Patch("/Api/FourQuadrants/ChangePriority", auth, task, successCallback);
  }
  const _imports_0$2 = "/static/日历.png";
  const _imports_1$1 = "/static/plane.png";
  const _imports_2$1 = "/static/plane-filled.png";
  const _imports_3$1 = "/static/闹钟.png";
  const _sfc_main$9 = {
    __name: "fourQuadrants",
    setup(__props, { expose: __expose }) {
      __expose();
      const pattern2 = vue.ref({
        color: "#7A7E83",
        backgroundColor: "#fff",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      });
      const taskEditor = vue.ref(null);
      const timePopup = vue.ref(null);
      const priorityPopup = vue.ref(null);
      const defRulePopup = vue.ref(null);
      const customPopup = vue.ref(null);
      const quadrant1 = vue.ref(null);
      const quadrant2 = vue.ref(null);
      const quadrant3 = vue.ref(null);
      const quadrant4 = vue.ref(null);
      const quadrant = vue.ref("quadrant");
      const startTime = vue.ref({
        date: "",
        time: ""
      });
      const endTime = vue.ref({
        date: "",
        time: ""
      });
      const today2 = vue.ref(/* @__PURE__ */ new Date());
      const state = vue.reactive({
        priority: [],
        task: {
          title: "",
          description: "",
          priority: 4,
          beginTime: "",
          endTime: "",
          userId: user == "" ? uni.getStorageSync("user").uid : user.uid,
          reminderInfoModels: [],
          period: null,
          periodUnit: null,
          custom: null,
          count: null,
          deadline: null,
          repeatable: false
        },
        selectedDay: /* @__PURE__ */ new Date(),
        notifyOpt: [
          [],
          ["分", "时", "天", "周", "月"]
        ],
        frequency: {
          data: frequency,
          selection: 0,
          multiData: [
            [],
            ["天", "周", "月", "年"],
            []
          ],
          selected: []
        },
        rule: {
          data: customDef,
          selection: 0,
          selected: []
        },
        weekdays,
        canCreateTask: false,
        selectedTask: null,
        isTaskUpdate: false,
        data: {},
        dataOption: {}
      });
      vue.onMounted(() => {
        for (let i2 = 0; i2 < 4; i2++)
          state.priority.push(new ValueText(i2 + 1, ""));
        state.priority[0].text = "Ⅰ " + priority[0].text;
        state.priority[1].text = "Ⅱ " + priority[1].text;
        state.priority[2].text = "Ⅲ " + priority[2].text;
        state.priority[3].text = "Ⅳ " + priority[3].text;
        for (let i2 = 1; i2 <= 99; i2++)
          state.frequency.multiData[0].push(i2);
        for (let i2 = 1; i2 <= 1e3; i2++)
          state.frequency.multiData[2].push(i2);
        state.notifyOpt[0] = remindModeValues(1);
        resetBeginEndTime();
        getData();
        vue.nextTick(() => {
          buildElById(quadrant1.value[0]);
          buildElById(quadrant2.value[0]);
          buildElById(quadrant3.value[0]);
          buildElById(quadrant4.value[0]);
        });
      });
      function getData() {
        GetTasks(state.task.userId, today2.value, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          state.data = res.data;
          for (let pro in state.data) {
            for (let task of state.data[pro]) {
              task.beginTime = new Date(task.beginTime);
              task.endTime = new Date(task.endTime);
              if (task.deadline != null)
                task.deadline = new Date(task.deadline);
              task.style = "";
            }
            state.dataOption[pro] = false;
          }
          uni.removeStorageSync(TaskReminderKey$1);
        });
      }
      function reloadModelData() {
        state.task = {
          title: "",
          description: "",
          priority: 4,
          beginTime: "",
          endTime: "",
          userId: user == "" ? uni.getStorageSync("user").uid : user.uid,
          reminderInfoModels: [],
          period: null,
          periodUnit: null,
          custom: null,
          count: null,
          deadline: null,
          repeatable: false
        };
        state.frequency.selected = [];
        state.frequency.selection = 0;
        state.rule.selected = [];
        state.rule.selection = 0;
        state.selectedTask = null;
        state.isTaskUpdate = false;
        state.canCreateTask = false;
      }
      function beforeEditorClose(e2) {
        if (e2.show)
          return;
        reloadModelData();
      }
      function addReminderInfoModel(e2) {
        const values = e2.detail.value;
        const reminder = ReminderInfo.getInstance(values[1] + 1, values[0] + 1, /* @__PURE__ */ new Date(startTime.value.date + " " + startTime.value.time));
        if (reminder.mode == 1)
          reminder.value = values[0];
        const data = state.task.reminderInfoModels;
        if (data.length == 0)
          data.push(reminder);
        else {
          var i2;
          for (i2 = 0; i2 < data.length; i2++) {
            if (reminder.timing.getTime() < data[i2].timing.getTime() && data.findIndex((r2) => r2.timing.getTime() == reminder.timing.getTime()) < 0) {
              data.splice(i2, 0, reminder);
              break;
            }
          }
          if (i2 == data.length && data.findIndex((r2) => r2.timing.getTime() == reminder.timing.getTime()) < 0)
            data.push(reminder);
        }
      }
      function removeReminderInfoModel(index) {
        state.task.reminderInfoModels.splice(index, 1);
      }
      function titleInput(current) {
        if (state.isTaskUpdate)
          return;
        state.canCreateTask = current.length > 0;
      }
      function resetBeginEndTime() {
        startTime.value.date = getDateStr(state.selectedDay);
        startTime.value.time = timeWithoutSeconds(state.selectedDay);
        const date = new Date(state.selectedDay);
        date.setHours(date.getHours() + 1);
        endTime.value.date = getDateStr(date);
        endTime.value.time = timeWithoutSeconds(date);
        state.task.beginTime = /* @__PURE__ */ new Date(startTime.value.date + " " + startTime.value.time);
        state.task.endTime = /* @__PURE__ */ new Date(endTime.value.date + " " + endTime.value.time);
      }
      function pick(sign, event) {
        const value = event.detail.value;
        switch (sign) {
          case "begin-date":
            startTime.value.date = value.replace(/-/g, "/");
            break;
          case "begin-time":
            startTime.value.time = value;
            break;
          case "end-date":
            endTime.value.date = value.replace(/-/g, "/");
            break;
          case "end-time":
            endTime.value.time = value;
            break;
        }
        const begin = /* @__PURE__ */ new Date(startTime.value.date + " " + startTime.value.time);
        const end = /* @__PURE__ */ new Date(endTime.value.date + " " + endTime.value.time);
        if (end.getTime() <= begin.getTime()) {
          begin.setHours(begin.getHours() + 1);
          endTime.value.date = getDateStr(begin);
          endTime.value.time = timeWithoutSeconds(begin);
        }
      }
      function changeNotifyMode(e2) {
        const detail = e2.detail;
        if (detail.column == 1) {
          state.notifyOpt[0] = remindModeValues(detail.value + 1);
        }
      }
      function toUpdate(index, quadrantName) {
        state.isTaskUpdate = true;
        const task = state.data[quadrantName][index];
        task.index = index;
        GetTaskReminders(task.instanceId, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          state.selectedTask = task;
          for (let reminder of res.data)
            reminder.timing = new Date(reminder.timing);
          state.selectedTask.reminderInfoModels = res.data;
          copy(state.selectedTask, state.task);
          startTime.value.date = getDateStr(state.task.beginTime);
          startTime.value.time = timeWithoutSeconds(state.task.beginTime);
          endTime.value.date = getDateStr(state.task.endTime);
          endTime.value.time = timeWithoutSeconds(state.task.endTime);
          taskEditor.value.open();
        });
      }
      function openToEdit() {
        taskEditor.value.open();
      }
      function takePriority(item) {
        state.task.priority = item.value;
        priorityPopup.value.close();
      }
      function takeBaseRule(e2) {
        const value = e2.value;
        if (value < state.frequency.data.length) {
          if (value == 0) {
            state.task.period = null;
            state.task.repeatable = false;
            defRulePopup.value.close();
            return;
          }
          state.task.repeatable = true;
          state.task.period = 1;
          state.task.periodUnit = value;
        } else {
          state.task.repeatable = true;
          customPopup.value.open();
          state.frequency.selection = 0;
          state.task.period = null;
          state.task.periodUnit = null;
        }
        defRulePopup.value.close();
      }
      function takeCount(e2) {
        const values = e2.detail.value;
        state.task.count = values[0] + 1;
      }
      function takeDeadline(e2) {
        const value = e2.detail.value;
        state.task.deadline = new Date(value);
      }
      function takeDef(e2) {
        const values = e2.detail.value;
        state.task.period = values[0] + 1;
        state.task.periodUnit = values[1] + 1;
      }
      function resetSomeData() {
        if (state.rule.selection == 0) {
          state.task.count = null;
          state.task.deadline = null;
        } else if (state.rule.selection == 1) {
          state.task.count = null;
        } else if (state.rule.selection == 2) {
          state.task.deadline = null;
        }
      }
      function resetDataOption() {
        for (let pro in state.dataOption)
          state.dataOption[pro] = false;
      }
      function editTask() {
        state.task.beginTime = /* @__PURE__ */ new Date(`${startTime.value.date} ${startTime.value.time}`);
        state.task.endTime = /* @__PURE__ */ new Date(`${endTime.value.date} ${endTime.value.time}`);
        if (!state.isTaskUpdate) {
          CreateTask(state.task, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
              return;
            }
            loading("创建中...", () => {
              state.task.taskId = res.data;
              state.task.instanceId = res.data;
              const task = {};
              task.style = "";
              copy(state.task, task);
              state.data[`${quadrant.value}-${state.task.priority}`].push(task);
              taskEditor.value.close();
            }, 750);
          });
        } else {
          if (state.task.title.length == 0)
            state.task.title = state.selectedTask.title;
          UpdateTask(state.task, (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
              return;
            }
            loading("", () => {
              const quadrantFrom = `${quadrant.value}-${state.selectedTask.priority}`;
              const quadrantTo = `${quadrant.value}-${state.task.priority}`;
              copy(state.task, state.selectedTask);
              if (quadrantFrom != quadrantTo) {
                state.data[quadrantFrom].splice(state.selectedTask.index, 1);
                const data = state.data[quadrantTo];
                if (data.length == 0)
                  data.push(state.selectedTask);
                else {
                  var i2;
                  for (i2 = 0; i2 < data.length; i2++) {
                    if (data[i2].createTime <= state.selectedTask.createTime) {
                      data.splice(i2, 0, state.selectedTask);
                      break;
                    }
                  }
                  if (i2 == data.length)
                    data.push(state.selectedTask);
                  uni.removeStorageSync(TaskReminderKey$1);
                }
              }
              taskEditor.value.close();
            }, 550);
          });
        }
      }
      function selectDay(date) {
        state.selectedDay = date;
        resetBeginEndTime();
        state.task.beginTime = /* @__PURE__ */ new Date(`${startTime.value.date} ${startTime.value.time}`);
        state.task.endTime = /* @__PURE__ */ new Date(`${endTime.value.date} ${endTime.value.time}`);
      }
      function getTimeStr(date) {
        if (dateEquals(date, today2.value))
          return timeWithoutSeconds(date);
        else
          return getDateTimeStr(date, date.getFullYear());
      }
      function finishOrNot(task) {
        var state2 = 0;
        if (task.state == TaskState.unfinished)
          state2 = TaskState.finished;
        else if (task.state == TaskState.finished)
          state2 = TaskState.unfinished;
        FinishOrNot$1(task.instanceId, state2, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          task.state = state2;
        });
      }
      function toDragTaskContent(event, task) {
        event.stopPropagation();
        const point = event.touches[0];
        const position = {
          x: point.pageX,
          y: point.pageY
        };
        if (taskContentIn(position, getElementBound(quadrant1.value[0].$el)))
          state.dataOption[`${quadrant.value}-1`] = true;
        else if (taskContentIn(position, getElementBound(quadrant2.value[0].$el)))
          state.dataOption[`${quadrant.value}-2`] = true;
        else if (taskContentIn(position, getElementBound(quadrant3.value[0].$el)))
          state.dataOption[`${quadrant.value}-3`] = true;
        else if (taskContentIn(position, getElementBound(quadrant4.value[0].$el)))
          state.dataOption[`${quadrant.value}-4`] = true;
        task.style = "position:relative;z-index:1000;top:5px;left:-5px;background-color:cyan;";
      }
      function draggingTaskContent(event, task) {
        event.stopPropagation();
        const point = event.touches[0];
        const position = {
          x: point.pageX,
          y: point.pageY
        };
        if (task.style.length > 0) {
          task.style = `position:absolute;background-color:cyan;z-index:1000;top:${position.y}px;left:${position.x}px;
				-webkit-transform:translate(-50%,-50%)`;
          if (taskContentIn(position, getElementBound(quadrant1.value[0].$el))) {
            resetDataOption();
            state.dataOption[`${quadrant.value}-1`] = true;
          } else if (taskContentIn(position, getElementBound(quadrant2.value[0].$el))) {
            resetDataOption();
            state.dataOption[`${quadrant.value}-2`] = true;
          } else if (taskContentIn(position, getElementBound(quadrant3.value[0].$el))) {
            resetDataOption();
            state.dataOption[`${quadrant.value}-3`] = true;
          } else if (taskContentIn(position, getElementBound(quadrant4.value[0].$el))) {
            resetDataOption();
            state.dataOption[`${quadrant.value}-4`] = true;
          }
        }
      }
      function taskContentDragged(event, task, itemIndex) {
        task.style = "";
        state.selectedTask = null;
        const point = event.changedTouches[0];
        const position = {
          x: point.pageX,
          y: point.pageY
        };
        resetDataOption();
        var priority2 = void 0;
        if (taskContentIn(position, getElementBound(quadrant1.value[0].$el)) && task.priority != state.priority[0].value)
          priority2 = state.priority[0].value;
        else if (taskContentIn(position, getElementBound(quadrant2.value[0].$el)) && task.priority != state.priority[1].value)
          priority2 = state.priority[1].value;
        else if (taskContentIn(position, getElementBound(quadrant3.value[0].$el)) && task.priority != state.priority[2].value)
          priority2 = state.priority[2].value;
        else if (taskContentIn(position, getElementBound(quadrant4.value[0].$el)) && task.priority != state.priority[3].value)
          priority2 = state.priority[3].value;
        if (priority2 == void 0)
          return;
        ChangePriority({
          taskId: task.taskId,
          instanceId: task.instanceId,
          priority: priority2,
          repeatable: task.repeatable
        }, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          const quadrantValue = `${quadrant.value}-${task.priority}`;
          const toQuadrant = `${quadrant.value}-${priority2}`;
          state.data[quadrantValue].splice(itemIndex, 1);
          task.priority = priority2;
          const data = state.data[toQuadrant];
          if (data.length == 0)
            data.push(task);
          else {
            var i2;
            for (i2 = 0; i2 < data.length; i2++) {
              if (data[i2].createTime <= task.createTime) {
                data.splice(i2, 0, task);
                break;
              }
            }
            if (i2 == data.length)
              data.push(task);
          }
        });
      }
      function cancelDragging(task) {
        task.style = "";
      }
      function taskContentIn(position, bound) {
        return position.x >= bound.left && position.x <= bound.left + bound.width && position.y >= bound.top && position.y <= bound.top + bound.height;
      }
      function getElementBound(element) {
        return {
          left: element.offsetLeft,
          top: element.offsetTop,
          width: element.offsetWidth,
          height: element.offsetHeight
        };
      }
      function getQuadrant(index) {
        return `${quadrant.value}-${index + 1}`;
      }
      const __returned__ = { pattern: pattern2, taskEditor, timePopup, priorityPopup, defRulePopup, customPopup, quadrant1, quadrant2, quadrant3, quadrant4, quadrant, startTime, endTime, today: today2, state, getData, reloadModelData, beforeEditorClose, addReminderInfoModel, removeReminderInfoModel, titleInput, resetBeginEndTime, pick, changeNotifyMode, toUpdate, openToEdit, takePriority, takeBaseRule, takeCount, takeDeadline, takeDef, resetSomeData, resetDataOption, editTask, selectDay, getTimeStr, finishOrNot, toDragTaskContent, draggingTaskContent, taskContentDragged, cancelDragging, taskContentIn, getElementBound, getQuadrant, onMounted: vue.onMounted, ref: vue.ref, reactive: vue.reactive, nextTick: vue.nextTick, get ValueText() {
        return ValueText;
      }, get priority() {
        return priority;
      }, get CalendarDisplayWay() {
        return CalendarDisplayWay;
      }, get getDateStr() {
        return getDateStr;
      }, get timeWithoutSeconds() {
        return timeWithoutSeconds;
      }, get remindModeValues() {
        return remindModeValues;
      }, get getRuleText() {
        return getRuleText;
      }, get frequency() {
        return frequency;
      }, get customDef() {
        return customDef;
      }, get weekdays() {
        return weekdays;
      }, get ReminderInfo() {
        return ReminderInfo;
      }, get copy() {
        return copy;
      }, get loading() {
        return loading;
      }, get getDateTimeStr() {
        return getDateTimeStr;
      }, get dateEquals() {
        return dateEquals;
      }, get TaskState() {
        return TaskState;
      }, get dateGE() {
        return dateGE;
      }, get weekDaySign() {
        return weekDaySign;
      }, get buildElById() {
        return buildElById;
      }, get TaskReminderKey() {
        return TaskReminderKey$1;
      }, get CreateTask() {
        return CreateTask;
      }, get GetTaskReminders() {
        return GetTaskReminders;
      }, get FinishOrNot() {
        return FinishOrNot$1;
      }, get ChangePriority() {
        return ChangePriority;
      }, get GetTasks() {
        return GetTasks;
      }, get UpdateTask() {
        return UpdateTask;
      }, get user() {
        return user;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_k_time_counter = vue.resolveComponent("k-time-counter");
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_1$5);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2);
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    const _component_k_calendar = vue.resolveComponent("k-calendar");
    const _component_k_radio_group = vue.resolveComponent("k-radio-group");
    const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_5);
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock("view", { id: "four-quadrants" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", null, "四象限"),
        vue.createTextVNode("   "),
        vue.createElementVNode(
          "text",
          { style: { "color": "rgb(25,27,28)", "font-size": "17px" } },
          vue.toDisplayString($setup.today.getFullYear()) + "年" + vue.toDisplayString($setup.today.getMonth() + 1) + "月" + vue.toDisplayString($setup.today.getDate()) + "日 " + vue.toDisplayString($setup.weekDaySign($setup.today.getDay())),
          1
          /* TEXT */
        ),
        vue.createTextVNode("   "),
        vue.createVNode(_component_k_time_counter, { style: { "display": "inline-block", "color": "rgb(44,47,49)", "font-size": "16px" } })
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.state.priority, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "item",
              key: index,
              ref_for: true,
              ref: $setup.quadrant + (index + 1),
              id: $setup.getQuadrant(index),
              style: vue.normalizeStyle($setup.state.dataOption[$setup.getQuadrant(index)] ? "border:1.5px solid blue;" : "")
            }, [
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass($setup.getQuadrant(index))
                },
                vue.toDisplayString(item.text),
                3
                /* TEXT, CLASS */
              ),
              vue.createElementVNode("view", {
                "scroll-y": true,
                style: { "width": "100%" }
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.state.data[$setup.getQuadrant(index)], (task, index1) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: "item-content",
                        key: index1,
                        style: vue.normalizeStyle(task.style.length > 0 ? "" : "position:relative")
                      },
                      [
                        vue.createElementVNode("view", {
                          class: "task",
                          onClick: ($event) => $setup.toUpdate(index1, $setup.getQuadrant(index)),
                          onLongpress: ($event) => $setup.toDragTaskContent($event, task),
                          onTouchmove: ($event) => $setup.draggingTaskContent($event, task),
                          onTouchend: ($event) => $setup.taskContentDragged($event, task, index1),
                          onTouchcancel: ($event) => $setup.cancelDragging(task),
                          style: vue.normalizeStyle(task.style)
                        }, [
                          vue.createElementVNode("checkbox-group", {
                            onChange: ($event) => $setup.finishOrNot(task)
                          }, [
                            vue.createElementVNode("checkbox", {
                              checked: task.state == $setup.TaskState.finished,
                              style: { "transform": "scale(0.5)" }
                            }, null, 8, ["checked"])
                          ], 40, ["onChange"]),
                          vue.createElementVNode("view", { class: "info" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "task-text" },
                              vue.toDisplayString(task.title),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "text",
                              {
                                class: "text",
                                style: { "color": "rgb(0,75,235)" }
                              },
                              "开始：" + vue.toDisplayString($setup.getTimeStr(task.beginTime)),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "text",
                              {
                                class: "text",
                                style: { "color": "red" }
                              },
                              "结束：" + vue.toDisplayString($setup.getTimeStr(task.endTime)),
                              1
                              /* TEXT */
                            )
                          ])
                        ], 44, ["onClick", "onLongpress", "onTouchmove", "onTouchend", "onTouchcancel"])
                      ],
                      4
                      /* STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 12, ["id"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "taskEditor",
          type: "bottom",
          "background-color": "#fff",
          onChange: $setup.beforeEditorClose
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "task-edit" }, [
              vue.createElementVNode("view", { class: "head" }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass("quadrant-" + $setup.state.task.priority),
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.priorityPopup.open())
                  },
                  vue.toDisplayString($setup.state.priority[$setup.state.task.priority - 1].text),
                  3
                  /* TEXT, CLASS */
                ),
                vue.createElementVNode("image", {
                  src: _imports_0$2,
                  onClick: _cache[1] || (_cache[1] = ($event) => $setup.timePopup.open()),
                  class: "image"
                }),
                !$setup.state.canCreateTask && !$setup.state.isTaskUpdate ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: _imports_1$1,
                  size: 18,
                  class: "image"
                })) : vue.createCommentVNode("v-if", true),
                $setup.state.isTaskUpdate || $setup.state.canCreateTask ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  src: _imports_2$1,
                  size: 18,
                  class: "image",
                  onClick: $setup.editTask
                })) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createVNode(_component_uni_easyinput, {
                modelValue: $setup.state.task.title,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.state.task.title = $event),
                placeholder: "标题",
                focus: "",
                style: { "margin-bottom": "2px", "margin-top": "3px" },
                onInput: $setup.titleInput
              }, null, 8, ["modelValue"]),
              vue.createVNode(_component_uni_easyinput, {
                modelValue: $setup.state.task.description,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.state.task.description = $event),
                placeholder: "描述",
                type: "textarea",
                rows: 3
              }, null, 8, ["modelValue"])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "priorityPopup",
          "background-color": "#fff",
          "border-radius": "10px 10px 10px 10px"
        },
        {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_list, {
              border: true,
              style: { "width": "60vw" }
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.state.priority, (item, index) => {
                    return vue.openBlock(), vue.createBlock(
                      _component_uni_list_item,
                      { key: index },
                      {
                        body: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            class: vue.normalizeClass("quadrant-" + (index + 1)),
                            onClick: ($event) => $setup.takePriority(item),
                            style: { "width": "100%", "text-align": "center" }
                          }, vue.toDisplayString(item.text), 11, ["onClick"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "timePopup",
          "background-color": "#fff",
          type: "bottom"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "display": "flex", "width": "96%", "margin-bottom": "1%" } }, [
              vue.createVNode(_component_uni_icons, {
                type: "closeempty",
                onClick: _cache[4] || (_cache[4] = ($event) => $setup.timePopup.close()),
                size: 20
              })
            ]),
            vue.createVNode(_component_k_calendar, {
              showWay: $setup.CalendarDisplayWay.month,
              unchangable: true,
              onOnChange: $setup.selectDay
            }, null, 8, ["showWay"]),
            vue.createVNode(_component_uni_list, {
              class: "time",
              border: true
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                  body: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "time-item" }, [
                      vue.createElementVNode("image", {
                        src: _imports_3$1,
                        class: "image"
                      }),
                      vue.createElementVNode("view", { class: "select-datetime" }, [
                        vue.createTextVNode(" 开始： "),
                        vue.createElementVNode("picker", {
                          mode: "date",
                          onChange: _cache[5] || (_cache[5] = ($event) => $setup.pick("begin-date", $event)),
                          value: $setup.startTime.date
                        }, vue.toDisplayString($setup.startTime.date), 41, ["value"]),
                        vue.createTextVNode("   "),
                        vue.createElementVNode("picker", {
                          mode: "time",
                          onChange: _cache[6] || (_cache[6] = ($event) => $setup.pick("begin-time", $event)),
                          value: $setup.startTime.time
                        }, vue.toDisplayString($setup.startTime.time), 41, ["value"])
                      ]),
                      vue.createElementVNode("view", { class: "select-datetime" }, [
                        vue.createTextVNode(" 结束： "),
                        vue.createElementVNode("picker", {
                          mode: "date",
                          onChange: _cache[7] || (_cache[7] = ($event) => $setup.pick("end-date", $event)),
                          value: $setup.endTime.date
                        }, vue.toDisplayString($setup.endTime.date), 41, ["value"]),
                        vue.createTextVNode("   "),
                        vue.createElementVNode("picker", {
                          mode: "time",
                          onChange: _cache[8] || (_cache[8] = ($event) => $setup.pick("end-time", $event)),
                          value: $setup.endTime.time
                        }, vue.toDisplayString($setup.endTime.time), 41, ["value"])
                      ])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                  body: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "time-item" }, [
                      vue.createElementVNode("view", { class: "info" }, [
                        vue.createVNode(_component_uni_icons, {
                          type: "notification",
                          size: 18,
                          color: "rgb(0,75,235)"
                        }),
                        vue.createElementVNode("text", null, "提醒")
                      ]),
                      vue.createElementVNode("picker", {
                        range: $setup.state.notifyOpt,
                        mode: "multiSelector",
                        onChange: $setup.addReminderInfoModel,
                        onColumnchange: $setup.changeNotifyMode
                      }, [
                        vue.createElementVNode("text", { class: "gray-text" }, "设置提醒")
                      ], 40, ["range"])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.withDirectives(vue.createVNode(
                  _component_uni_list_item,
                  null,
                  {
                    body: vue.withCtx(() => [
                      vue.createElementVNode("scroll-view", { "scroll-x": true }, [
                        vue.createElementVNode("view", { class: "reminders" }, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.state.task.reminderInfoModels, (reminder, index) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                class: "reminder",
                                key: index
                              }, [
                                vue.createVNode(_component_uni_icons, {
                                  size: 10,
                                  type: "closeempty",
                                  class: "close",
                                  onClick: ($event) => $setup.removeReminderInfoModel(index)
                                }, null, 8, ["onClick"]),
                                vue.createElementVNode(
                                  "text",
                                  { class: "reminder-text" },
                                  vue.toDisplayString($setup.ReminderInfo.getModeValueText(reminder)),
                                  1
                                  /* TEXT */
                                )
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $setup.state.task.reminderInfoModels.length > 0]
                ]),
                vue.createVNode(_component_uni_list_item, { "show-arrow": "" }, {
                  body: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "time-item" }, [
                      vue.createElementVNode("view", { class: "info" }, [
                        vue.createElementVNode("image", {
                          class: "image",
                          src: _imports_4
                        }),
                        vue.createElementVNode("text", null, "设置重复规则")
                      ]),
                      vue.createElementVNode(
                        "text",
                        {
                          onClick: _cache[9] || (_cache[9] = ($event) => {
                            $setup.defRulePopup.open();
                            $setup.state.frequency.selected = [$setup.state.task.period - 1, $setup.state.task.periodUnit - 1];
                          }),
                          class: "gray-text"
                        },
                        vue.toDisplayString($setup.getRuleText($setup.state.task)),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          type: "center",
          "background-color": "#fff",
          "border-radius": "10px 10px 10px 10px",
          ref: "defRulePopup"
        },
        {
          default: vue.withCtx(() => [
            vue.createVNode(_component_k_radio_group, {
              data: $setup.state.frequency.data,
              containDef: true,
              onOnChange: $setup.takeBaseRule
            }, null, 8, ["data"])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          type: "bottom",
          "background-color": "#fff",
          "border-radius": "10px 10px 10px 10px",
          ref: "customPopup",
          "safe-area": false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("scroll-view", {
              class: "custom",
              "scroll-y": true
            }, [
              vue.createElementVNode("view", { style: { "display": "flex", "width": "96%", "margin-bottom": "1%" } }, [
                vue.createVNode(_component_uni_icons, {
                  type: "closeempty",
                  onClick: _cache[10] || (_cache[10] = ($event) => $setup.customPopup.close()),
                  size: 20
                })
              ]),
              vue.createElementVNode("view", { class: "head" }, [
                vue.createElementVNode("image", {
                  class: "image",
                  src: _imports_5
                }),
                vue.createElementVNode("picker", {
                  mode: "multiSelector",
                  value: $setup.state.frequency.selected,
                  onChange: $setup.takeDef,
                  range: [$setup.state.frequency.multiData[0], $setup.state.frequency.multiData[1]]
                }, vue.toDisplayString($setup.getRuleText($setup.state.task)), 41, ["value", "range"])
              ]),
              $setup.state.task.periodUnit == 2 ? (vue.openBlock(), vue.createBlock(_component_uni_data_checkbox, {
                key: 0,
                style: { "margin-bottom": "5px" },
                multiple: "",
                onChange: _ctx.takeCustom,
                modelValue: $setup.state.rule.selected,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.state.rule.selected = $event),
                localdata: $setup.state.weekdays,
                mode: "tag"
              }, null, 8, ["onChange", "modelValue", "localdata"])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { style: { "width": "100%", "display": "flex", "justify-content": "center" } }, [
                vue.createVNode(_component_k_radio_group, {
                  data: $setup.state.rule.data,
                  modelValue: $setup.state.rule.selection,
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.state.rule.selection = $event),
                  onOnChange: $setup.resetSomeData,
                  style: { "margin-top": "2%", "margin-bottom": "2%" }
                }, null, 8, ["data", "modelValue"])
              ]),
              $setup.state.rule.selection == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "picker"
              }, [
                vue.createElementVNode("picker", {
                  mode: "date",
                  value: $setup.state.task.deadline,
                  onChange: $setup.takeDeadline
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "gray-text" },
                    " 截止到  " + vue.toDisplayString($setup.state.task.deadline == null ? "" : $setup.getDateStr($setup.state.task.deadline)),
                    1
                    /* TEXT */
                  )
                ], 40, ["value"])
              ])) : vue.createCommentVNode("v-if", true),
              $setup.state.rule.selection == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "picker"
              }, [
                vue.createElementVNode("text", null, "重复"),
                vue.createElementVNode("picker-view", {
                  onChange: $setup.takeCount,
                  value: [$setup.state.task.count],
                  style: { "width": "20px", "height": "100%" }
                }, [
                  vue.createElementVNode("picker-view-column", null, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.state.frequency.multiData[2], (number, index) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: index,
                            class: "picker-inner"
                          },
                          vue.toDisplayString(number),
                          1
                          /* TEXT */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ], 40, ["value"]),
                vue.createElementVNode("text", null, "次")
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(_component_uni_fab, {
        pattern: $setup.pattern,
        content: _ctx.menuContent,
        horizontal: "right",
        vertical: "bottom",
        "pop-menu": false,
        onFabClick: $setup.openToEdit
      }, null, 8, ["pattern", "content"])
    ]);
  }
  const PagesFourQuadrants = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "D:/repos/html+css+js/SelfSchedule/pages/fourQuadrants.vue"]]);
  __definePage("pages/login", PagesLogin);
  __definePage("pages/index", PagesIndex);
  __definePage("pages/habit", PagesHabit);
  __definePage("pages/fourQuadrants", PagesFourQuadrants);
  var lookup = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    62,
    0,
    62,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    63,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ];
  function base64Decode(source, target) {
    var sourceLength = source.length;
    var paddingLength = source[sourceLength - 2] === "=" ? 2 : source[sourceLength - 1] === "=" ? 1 : 0;
    var tmp;
    var byteIndex = 0;
    var baseLength = sourceLength - paddingLength & 4294967292;
    for (var i2 = 0; i2 < baseLength; i2 += 4) {
      tmp = lookup[source.charCodeAt(i2)] << 18 | lookup[source.charCodeAt(i2 + 1)] << 12 | lookup[source.charCodeAt(i2 + 2)] << 6 | lookup[source.charCodeAt(i2 + 3)];
      target[byteIndex++] = tmp >> 16 & 255;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 1) {
      tmp = lookup[source.charCodeAt(i2)] << 10 | lookup[source.charCodeAt(i2 + 1)] << 4 | lookup[source.charCodeAt(i2 + 2)] >> 2;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 2) {
      tmp = lookup[source.charCodeAt(i2)] << 2 | lookup[source.charCodeAt(i2 + 1)] >> 4;
      target[byteIndex++] = tmp & 255;
    }
  }
  const $inject_window_crypto = {
    getRandomValues(arr) {
      if (!(arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Uint8ClampedArray)) {
        throw new Error("Expected an integer array");
      }
      if (arr.byteLength > 65536) {
        throw new Error("Can only request a maximum of 65536 bytes");
      }
      var crypto = requireNativePlugin("DCloud-Crypto");
      base64Decode(crypto.getRandomValues(arr.byteLength), new Uint8Array(
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      ));
      return arr;
    }
  };
  var gtpushMin = { exports: {} };
  /*! For license information please see gtpush-min.js.LICENSE.txt */
  (function(module, exports) {
    (function t2(e2, r2) {
      module.exports = r2();
    })(self, () => (() => {
      var t2 = { 4736: (t22, e22, r22) => {
        t22 = r22.nmd(t22);
        var i22;
        var n2 = function(t3) {
          var e3 = 1e7, r3 = 7, i3 = 9007199254740992, s2 = d2(i3), a2 = "0123456789abcdefghijklmnopqrstuvwxyz";
          var o2 = "function" === typeof BigInt;
          function u2(t4, e4, r4, i4) {
            if ("undefined" === typeof t4)
              return u2[0];
            if ("undefined" !== typeof e4)
              return 10 === +e4 && !r4 ? st2(t4) : X2(t4, e4, r4, i4);
            return st2(t4);
          }
          function c2(t4, e4) {
            this.value = t4;
            this.sign = e4;
            this.isSmall = false;
          }
          c2.prototype = Object.create(u2.prototype);
          function l2(t4) {
            this.value = t4;
            this.sign = t4 < 0;
            this.isSmall = true;
          }
          l2.prototype = Object.create(u2.prototype);
          function f2(t4) {
            this.value = t4;
          }
          f2.prototype = Object.create(u2.prototype);
          function h2(t4) {
            return -i3 < t4 && t4 < i3;
          }
          function d2(t4) {
            if (t4 < 1e7)
              return [t4];
            if (t4 < 1e14)
              return [t4 % 1e7, Math.floor(t4 / 1e7)];
            return [t4 % 1e7, Math.floor(t4 / 1e7) % 1e7, Math.floor(t4 / 1e14)];
          }
          function v2(t4) {
            p2(t4);
            var r4 = t4.length;
            if (r4 < 4 && N2(t4, s2) < 0)
              switch (r4) {
                case 0:
                  return 0;
                case 1:
                  return t4[0];
                case 2:
                  return t4[0] + t4[1] * e3;
                default:
                  return t4[0] + (t4[1] + t4[2] * e3) * e3;
              }
            return t4;
          }
          function p2(t4) {
            var e4 = t4.length;
            while (0 === t4[--e4])
              ;
            t4.length = e4 + 1;
          }
          function g2(t4) {
            var e4 = new Array(t4);
            var r4 = -1;
            while (++r4 < t4)
              e4[r4] = 0;
            return e4;
          }
          function y2(t4) {
            if (t4 > 0)
              return Math.floor(t4);
            return Math.ceil(t4);
          }
          function m2(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = new Array(i4), a22 = 0, o22 = e3, u22, c22;
            for (c22 = 0; c22 < n22; c22++) {
              u22 = t4[c22] + r4[c22] + a22;
              a22 = u22 >= o22 ? 1 : 0;
              s22[c22] = u22 - a22 * o22;
            }
            while (c22 < i4) {
              u22 = t4[c22] + a22;
              a22 = u22 === o22 ? 1 : 0;
              s22[c22++] = u22 - a22 * o22;
            }
            if (a22 > 0)
              s22.push(a22);
            return s22;
          }
          function w2(t4, e4) {
            if (t4.length >= e4.length)
              return m2(t4, e4);
            return m2(e4, t4);
          }
          function S2(t4, r4) {
            var i4 = t4.length, n22 = new Array(i4), s22 = e3, a22, o22;
            for (o22 = 0; o22 < i4; o22++) {
              a22 = t4[o22] - s22 + r4;
              r4 = Math.floor(a22 / s22);
              n22[o22] = a22 - r4 * s22;
              r4 += 1;
            }
            while (r4 > 0) {
              n22[o22++] = r4 % s22;
              r4 = Math.floor(r4 / s22);
            }
            return n22;
          }
          c2.prototype.add = function(t4) {
            var e4 = st2(t4);
            if (this.sign !== e4.sign)
              return this.subtract(e4.negate());
            var r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return new c2(S2(r4, Math.abs(i4)), this.sign);
            return new c2(w2(r4, i4), this.sign);
          };
          c2.prototype.plus = c2.prototype.add;
          l2.prototype.add = function(t4) {
            var e4 = st2(t4);
            var r4 = this.value;
            if (r4 < 0 !== e4.sign)
              return this.subtract(e4.negate());
            var i4 = e4.value;
            if (e4.isSmall) {
              if (h2(r4 + i4))
                return new l2(r4 + i4);
              i4 = d2(Math.abs(i4));
            }
            return new c2(S2(i4, Math.abs(r4)), r4 < 0);
          };
          l2.prototype.plus = l2.prototype.add;
          f2.prototype.add = function(t4) {
            return new f2(this.value + st2(t4).value);
          };
          f2.prototype.plus = f2.prototype.add;
          function _2(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = new Array(i4), a22 = 0, o22 = e3, u22, c22;
            for (u22 = 0; u22 < n22; u22++) {
              c22 = t4[u22] - a22 - r4[u22];
              if (c22 < 0) {
                c22 += o22;
                a22 = 1;
              } else
                a22 = 0;
              s22[u22] = c22;
            }
            for (u22 = n22; u22 < i4; u22++) {
              c22 = t4[u22] - a22;
              if (c22 < 0)
                c22 += o22;
              else {
                s22[u22++] = c22;
                break;
              }
              s22[u22] = c22;
            }
            for (; u22 < i4; u22++)
              s22[u22] = t4[u22];
            p2(s22);
            return s22;
          }
          function b2(t4, e4, r4) {
            var i4;
            if (N2(t4, e4) >= 0)
              i4 = _2(t4, e4);
            else {
              i4 = _2(e4, t4);
              r4 = !r4;
            }
            i4 = v2(i4);
            if ("number" === typeof i4) {
              if (r4)
                i4 = -i4;
              return new l2(i4);
            }
            return new c2(i4, r4);
          }
          function E2(t4, r4, i4) {
            var n22 = t4.length, s22 = new Array(n22), a22 = -r4, o22 = e3, u22, f22;
            for (u22 = 0; u22 < n22; u22++) {
              f22 = t4[u22] + a22;
              a22 = Math.floor(f22 / o22);
              f22 %= o22;
              s22[u22] = f22 < 0 ? f22 + o22 : f22;
            }
            s22 = v2(s22);
            if ("number" === typeof s22) {
              if (i4)
                s22 = -s22;
              return new l2(s22);
            }
            return new c2(s22, i4);
          }
          c2.prototype.subtract = function(t4) {
            var e4 = st2(t4);
            if (this.sign !== e4.sign)
              return this.add(e4.negate());
            var r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return E2(r4, Math.abs(i4), this.sign);
            return b2(r4, i4, this.sign);
          };
          c2.prototype.minus = c2.prototype.subtract;
          l2.prototype.subtract = function(t4) {
            var e4 = st2(t4);
            var r4 = this.value;
            if (r4 < 0 !== e4.sign)
              return this.add(e4.negate());
            var i4 = e4.value;
            if (e4.isSmall)
              return new l2(r4 - i4);
            return E2(i4, Math.abs(r4), r4 >= 0);
          };
          l2.prototype.minus = l2.prototype.subtract;
          f2.prototype.subtract = function(t4) {
            return new f2(this.value - st2(t4).value);
          };
          f2.prototype.minus = f2.prototype.subtract;
          c2.prototype.negate = function() {
            return new c2(this.value, !this.sign);
          };
          l2.prototype.negate = function() {
            var t4 = this.sign;
            var e4 = new l2(-this.value);
            e4.sign = !t4;
            return e4;
          };
          f2.prototype.negate = function() {
            return new f2(-this.value);
          };
          c2.prototype.abs = function() {
            return new c2(this.value, false);
          };
          l2.prototype.abs = function() {
            return new l2(Math.abs(this.value));
          };
          f2.prototype.abs = function() {
            return new f2(this.value >= 0 ? this.value : -this.value);
          };
          function D2(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = i4 + n22, a22 = g2(s22), o22 = e3, u22, c22, l22, f22, h22;
            for (l22 = 0; l22 < i4; ++l22) {
              f22 = t4[l22];
              for (var d22 = 0; d22 < n22; ++d22) {
                h22 = r4[d22];
                u22 = f22 * h22 + a22[l22 + d22];
                c22 = Math.floor(u22 / o22);
                a22[l22 + d22] = u22 - c22 * o22;
                a22[l22 + d22 + 1] += c22;
              }
            }
            p2(a22);
            return a22;
          }
          function M2(t4, r4) {
            var i4 = t4.length, n22 = new Array(i4), s22 = e3, a22 = 0, o22, u22;
            for (u22 = 0; u22 < i4; u22++) {
              o22 = t4[u22] * r4 + a22;
              a22 = Math.floor(o22 / s22);
              n22[u22] = o22 - a22 * s22;
            }
            while (a22 > 0) {
              n22[u22++] = a22 % s22;
              a22 = Math.floor(a22 / s22);
            }
            return n22;
          }
          function T2(t4, e4) {
            var r4 = [];
            while (e4-- > 0)
              r4.push(0);
            return r4.concat(t4);
          }
          function I2(t4, e4) {
            var r4 = Math.max(t4.length, e4.length);
            if (r4 <= 30)
              return D2(t4, e4);
            r4 = Math.ceil(r4 / 2);
            var i4 = t4.slice(r4), n22 = t4.slice(0, r4), s22 = e4.slice(r4), a22 = e4.slice(0, r4);
            var o22 = I2(n22, a22), u22 = I2(i4, s22), c22 = I2(w2(n22, i4), w2(a22, s22));
            var l22 = w2(w2(o22, T2(_2(_2(c22, o22), u22), r4)), T2(u22, 2 * r4));
            p2(l22);
            return l22;
          }
          function A2(t4, e4) {
            return -0.012 * t4 - 0.012 * e4 + 15e-6 * t4 * e4 > 0;
          }
          c2.prototype.multiply = function(t4) {
            var r4 = st2(t4), i4 = this.value, n22 = r4.value, s22 = this.sign !== r4.sign, a22;
            if (r4.isSmall) {
              if (0 === n22)
                return u2[0];
              if (1 === n22)
                return this;
              if (-1 === n22)
                return this.negate();
              a22 = Math.abs(n22);
              if (a22 < e3)
                return new c2(M2(i4, a22), s22);
              n22 = d2(a22);
            }
            if (A2(i4.length, n22.length))
              return new c2(I2(i4, n22), s22);
            return new c2(D2(i4, n22), s22);
          };
          c2.prototype.times = c2.prototype.multiply;
          function x(t4, r4, i4) {
            if (t4 < e3)
              return new c2(M2(r4, t4), i4);
            return new c2(D2(r4, d2(t4)), i4);
          }
          l2.prototype._multiplyBySmall = function(t4) {
            if (h2(t4.value * this.value))
              return new l2(t4.value * this.value);
            return x(Math.abs(t4.value), d2(Math.abs(this.value)), this.sign !== t4.sign);
          };
          c2.prototype._multiplyBySmall = function(t4) {
            if (0 === t4.value)
              return u2[0];
            if (1 === t4.value)
              return this;
            if (-1 === t4.value)
              return this.negate();
            return x(Math.abs(t4.value), this.value, this.sign !== t4.sign);
          };
          l2.prototype.multiply = function(t4) {
            return st2(t4)._multiplyBySmall(this);
          };
          l2.prototype.times = l2.prototype.multiply;
          f2.prototype.multiply = function(t4) {
            return new f2(this.value * st2(t4).value);
          };
          f2.prototype.times = f2.prototype.multiply;
          function R2(t4) {
            var r4 = t4.length, i4 = g2(r4 + r4), n22 = e3, s22, a22, o22, u22, c22;
            for (o22 = 0; o22 < r4; o22++) {
              u22 = t4[o22];
              a22 = 0 - u22 * u22;
              for (var l22 = o22; l22 < r4; l22++) {
                c22 = t4[l22];
                s22 = 2 * (u22 * c22) + i4[o22 + l22] + a22;
                a22 = Math.floor(s22 / n22);
                i4[o22 + l22] = s22 - a22 * n22;
              }
              i4[o22 + r4] = a22;
            }
            p2(i4);
            return i4;
          }
          c2.prototype.square = function() {
            return new c2(R2(this.value), false);
          };
          l2.prototype.square = function() {
            var t4 = this.value * this.value;
            if (h2(t4))
              return new l2(t4);
            return new c2(R2(d2(Math.abs(this.value))), false);
          };
          f2.prototype.square = function(t4) {
            return new f2(this.value * this.value);
          };
          function B2(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = e3, a22 = g2(r4.length), o22 = r4[n22 - 1], u22 = Math.ceil(s22 / (2 * o22)), c22 = M2(t4, u22), l22 = M2(r4, u22), f22, h22, d22, p22, y22, m22, w22;
            if (c22.length <= i4)
              c22.push(0);
            l22.push(0);
            o22 = l22[n22 - 1];
            for (h22 = i4 - n22; h22 >= 0; h22--) {
              f22 = s22 - 1;
              if (c22[h22 + n22] !== o22)
                f22 = Math.floor((c22[h22 + n22] * s22 + c22[h22 + n22 - 1]) / o22);
              d22 = 0;
              p22 = 0;
              m22 = l22.length;
              for (y22 = 0; y22 < m22; y22++) {
                d22 += f22 * l22[y22];
                w22 = Math.floor(d22 / s22);
                p22 += c22[h22 + y22] - (d22 - w22 * s22);
                d22 = w22;
                if (p22 < 0) {
                  c22[h22 + y22] = p22 + s22;
                  p22 = -1;
                } else {
                  c22[h22 + y22] = p22;
                  p22 = 0;
                }
              }
              while (0 !== p22) {
                f22 -= 1;
                d22 = 0;
                for (y22 = 0; y22 < m22; y22++) {
                  d22 += c22[h22 + y22] - s22 + l22[y22];
                  if (d22 < 0) {
                    c22[h22 + y22] = d22 + s22;
                    d22 = 0;
                  } else {
                    c22[h22 + y22] = d22;
                    d22 = 1;
                  }
                }
                p22 += d22;
              }
              a22[h22] = f22;
            }
            c22 = k(c22, u22)[0];
            return [v2(a22), v2(c22)];
          }
          function O2(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = [], a22 = [], o22 = e3, u22, c22, l22, f22, h22;
            while (i4) {
              a22.unshift(t4[--i4]);
              p2(a22);
              if (N2(a22, r4) < 0) {
                s22.push(0);
                continue;
              }
              c22 = a22.length;
              l22 = a22[c22 - 1] * o22 + a22[c22 - 2];
              f22 = r4[n22 - 1] * o22 + r4[n22 - 2];
              if (c22 > n22)
                l22 = (l22 + 1) * o22;
              u22 = Math.ceil(l22 / f22);
              do {
                h22 = M2(r4, u22);
                if (N2(h22, a22) <= 0)
                  break;
                u22--;
              } while (u22);
              s22.push(u22);
              a22 = _2(a22, h22);
            }
            s22.reverse();
            return [v2(s22), v2(a22)];
          }
          function k(t4, r4) {
            var i4 = t4.length, n22 = g2(i4), s22 = e3, a22, o22, u22, c22;
            u22 = 0;
            for (a22 = i4 - 1; a22 >= 0; --a22) {
              c22 = u22 * s22 + t4[a22];
              o22 = y2(c22 / r4);
              u22 = c22 - o22 * r4;
              n22[a22] = 0 | o22;
            }
            return [n22, 0 | u22];
          }
          function C2(t4, r4) {
            var i4, n22 = st2(r4);
            if (o2)
              return [new f2(t4.value / n22.value), new f2(t4.value % n22.value)];
            var s22 = t4.value, a22 = n22.value;
            var h22;
            if (0 === a22)
              throw new Error("Cannot divide by zero");
            if (t4.isSmall) {
              if (n22.isSmall)
                return [new l2(y2(s22 / a22)), new l2(s22 % a22)];
              return [u2[0], t4];
            }
            if (n22.isSmall) {
              if (1 === a22)
                return [t4, u2[0]];
              if (-1 == a22)
                return [t4.negate(), u2[0]];
              var p22 = Math.abs(a22);
              if (p22 < e3) {
                i4 = k(s22, p22);
                h22 = v2(i4[0]);
                var g22 = i4[1];
                if (t4.sign)
                  g22 = -g22;
                if ("number" === typeof h22) {
                  if (t4.sign !== n22.sign)
                    h22 = -h22;
                  return [new l2(h22), new l2(g22)];
                }
                return [new c2(h22, t4.sign !== n22.sign), new l2(g22)];
              }
              a22 = d2(p22);
            }
            var m22 = N2(s22, a22);
            if (-1 === m22)
              return [u2[0], t4];
            if (0 === m22)
              return [u2[t4.sign === n22.sign ? 1 : -1], u2[0]];
            if (s22.length + a22.length <= 200)
              i4 = B2(s22, a22);
            else
              i4 = O2(s22, a22);
            h22 = i4[0];
            var w22 = t4.sign !== n22.sign, S22 = i4[1], _22 = t4.sign;
            if ("number" === typeof h22) {
              if (w22)
                h22 = -h22;
              h22 = new l2(h22);
            } else
              h22 = new c2(h22, w22);
            if ("number" === typeof S22) {
              if (_22)
                S22 = -S22;
              S22 = new l2(S22);
            } else
              S22 = new c2(S22, _22);
            return [h22, S22];
          }
          c2.prototype.divmod = function(t4) {
            var e4 = C2(this, t4);
            return { quotient: e4[0], remainder: e4[1] };
          };
          f2.prototype.divmod = l2.prototype.divmod = c2.prototype.divmod;
          c2.prototype.divide = function(t4) {
            return C2(this, t4)[0];
          };
          f2.prototype.over = f2.prototype.divide = function(t4) {
            return new f2(this.value / st2(t4).value);
          };
          l2.prototype.over = l2.prototype.divide = c2.prototype.over = c2.prototype.divide;
          c2.prototype.mod = function(t4) {
            return C2(this, t4)[1];
          };
          f2.prototype.mod = f2.prototype.remainder = function(t4) {
            return new f2(this.value % st2(t4).value);
          };
          l2.prototype.remainder = l2.prototype.mod = c2.prototype.remainder = c2.prototype.mod;
          c2.prototype.pow = function(t4) {
            var e4 = st2(t4), r4 = this.value, i4 = e4.value, n22, s22, a22;
            if (0 === i4)
              return u2[1];
            if (0 === r4)
              return u2[0];
            if (1 === r4)
              return u2[1];
            if (-1 === r4)
              return e4.isEven() ? u2[1] : u2[-1];
            if (e4.sign)
              return u2[0];
            if (!e4.isSmall)
              throw new Error("The exponent " + e4.toString() + " is too large.");
            if (this.isSmall) {
              if (h2(n22 = Math.pow(r4, i4)))
                return new l2(y2(n22));
            }
            s22 = this;
            a22 = u2[1];
            while (true) {
              if (i4 & true) {
                a22 = a22.times(s22);
                --i4;
              }
              if (0 === i4)
                break;
              i4 /= 2;
              s22 = s22.square();
            }
            return a22;
          };
          l2.prototype.pow = c2.prototype.pow;
          f2.prototype.pow = function(t4) {
            var e4 = st2(t4);
            var r4 = this.value, i4 = e4.value;
            var n22 = BigInt(0), s22 = BigInt(1), a22 = BigInt(2);
            if (i4 === n22)
              return u2[1];
            if (r4 === n22)
              return u2[0];
            if (r4 === s22)
              return u2[1];
            if (r4 === BigInt(-1))
              return e4.isEven() ? u2[1] : u2[-1];
            if (e4.isNegative())
              return new f2(n22);
            var o22 = this;
            var c22 = u2[1];
            while (true) {
              if ((i4 & s22) === s22) {
                c22 = c22.times(o22);
                --i4;
              }
              if (i4 === n22)
                break;
              i4 /= a22;
              o22 = o22.square();
            }
            return c22;
          };
          c2.prototype.modPow = function(t4, e4) {
            t4 = st2(t4);
            e4 = st2(e4);
            if (e4.isZero())
              throw new Error("Cannot take modPow with modulus 0");
            var r4 = u2[1], i4 = this.mod(e4);
            if (t4.isNegative()) {
              t4 = t4.multiply(u2[-1]);
              i4 = i4.modInv(e4);
            }
            while (t4.isPositive()) {
              if (i4.isZero())
                return u2[0];
              if (t4.isOdd())
                r4 = r4.multiply(i4).mod(e4);
              t4 = t4.divide(2);
              i4 = i4.square().mod(e4);
            }
            return r4;
          };
          f2.prototype.modPow = l2.prototype.modPow = c2.prototype.modPow;
          function N2(t4, e4) {
            if (t4.length !== e4.length)
              return t4.length > e4.length ? 1 : -1;
            for (var r4 = t4.length - 1; r4 >= 0; r4--)
              if (t4[r4] !== e4[r4])
                return t4[r4] > e4[r4] ? 1 : -1;
            return 0;
          }
          c2.prototype.compareAbs = function(t4) {
            var e4 = st2(t4), r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return 1;
            return N2(r4, i4);
          };
          l2.prototype.compareAbs = function(t4) {
            var e4 = st2(t4), r4 = Math.abs(this.value), i4 = e4.value;
            if (e4.isSmall) {
              i4 = Math.abs(i4);
              return r4 === i4 ? 0 : r4 > i4 ? 1 : -1;
            }
            return -1;
          };
          f2.prototype.compareAbs = function(t4) {
            var e4 = this.value;
            var r4 = st2(t4).value;
            e4 = e4 >= 0 ? e4 : -e4;
            r4 = r4 >= 0 ? r4 : -r4;
            return e4 === r4 ? 0 : e4 > r4 ? 1 : -1;
          };
          c2.prototype.compare = function(t4) {
            if (t4 === 1 / 0)
              return -1;
            if (t4 === -1 / 0)
              return 1;
            var e4 = st2(t4), r4 = this.value, i4 = e4.value;
            if (this.sign !== e4.sign)
              return e4.sign ? 1 : -1;
            if (e4.isSmall)
              return this.sign ? -1 : 1;
            return N2(r4, i4) * (this.sign ? -1 : 1);
          };
          c2.prototype.compareTo = c2.prototype.compare;
          l2.prototype.compare = function(t4) {
            if (t4 === 1 / 0)
              return -1;
            if (t4 === -1 / 0)
              return 1;
            var e4 = st2(t4), r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return r4 == i4 ? 0 : r4 > i4 ? 1 : -1;
            if (r4 < 0 !== e4.sign)
              return r4 < 0 ? -1 : 1;
            return r4 < 0 ? 1 : -1;
          };
          l2.prototype.compareTo = l2.prototype.compare;
          f2.prototype.compare = function(t4) {
            if (t4 === 1 / 0)
              return -1;
            if (t4 === -1 / 0)
              return 1;
            var e4 = this.value;
            var r4 = st2(t4).value;
            return e4 === r4 ? 0 : e4 > r4 ? 1 : -1;
          };
          f2.prototype.compareTo = f2.prototype.compare;
          c2.prototype.equals = function(t4) {
            return 0 === this.compare(t4);
          };
          f2.prototype.eq = f2.prototype.equals = l2.prototype.eq = l2.prototype.equals = c2.prototype.eq = c2.prototype.equals;
          c2.prototype.notEquals = function(t4) {
            return 0 !== this.compare(t4);
          };
          f2.prototype.neq = f2.prototype.notEquals = l2.prototype.neq = l2.prototype.notEquals = c2.prototype.neq = c2.prototype.notEquals;
          c2.prototype.greater = function(t4) {
            return this.compare(t4) > 0;
          };
          f2.prototype.gt = f2.prototype.greater = l2.prototype.gt = l2.prototype.greater = c2.prototype.gt = c2.prototype.greater;
          c2.prototype.lesser = function(t4) {
            return this.compare(t4) < 0;
          };
          f2.prototype.lt = f2.prototype.lesser = l2.prototype.lt = l2.prototype.lesser = c2.prototype.lt = c2.prototype.lesser;
          c2.prototype.greaterOrEquals = function(t4) {
            return this.compare(t4) >= 0;
          };
          f2.prototype.geq = f2.prototype.greaterOrEquals = l2.prototype.geq = l2.prototype.greaterOrEquals = c2.prototype.geq = c2.prototype.greaterOrEquals;
          c2.prototype.lesserOrEquals = function(t4) {
            return this.compare(t4) <= 0;
          };
          f2.prototype.leq = f2.prototype.lesserOrEquals = l2.prototype.leq = l2.prototype.lesserOrEquals = c2.prototype.leq = c2.prototype.lesserOrEquals;
          c2.prototype.isEven = function() {
            return 0 === (1 & this.value[0]);
          };
          l2.prototype.isEven = function() {
            return 0 === (1 & this.value);
          };
          f2.prototype.isEven = function() {
            return (this.value & BigInt(1)) === BigInt(0);
          };
          c2.prototype.isOdd = function() {
            return 1 === (1 & this.value[0]);
          };
          l2.prototype.isOdd = function() {
            return 1 === (1 & this.value);
          };
          f2.prototype.isOdd = function() {
            return (this.value & BigInt(1)) === BigInt(1);
          };
          c2.prototype.isPositive = function() {
            return !this.sign;
          };
          l2.prototype.isPositive = function() {
            return this.value > 0;
          };
          f2.prototype.isPositive = l2.prototype.isPositive;
          c2.prototype.isNegative = function() {
            return this.sign;
          };
          l2.prototype.isNegative = function() {
            return this.value < 0;
          };
          f2.prototype.isNegative = l2.prototype.isNegative;
          c2.prototype.isUnit = function() {
            return false;
          };
          l2.prototype.isUnit = function() {
            return 1 === Math.abs(this.value);
          };
          f2.prototype.isUnit = function() {
            return this.abs().value === BigInt(1);
          };
          c2.prototype.isZero = function() {
            return false;
          };
          l2.prototype.isZero = function() {
            return 0 === this.value;
          };
          f2.prototype.isZero = function() {
            return this.value === BigInt(0);
          };
          c2.prototype.isDivisibleBy = function(t4) {
            var e4 = st2(t4);
            if (e4.isZero())
              return false;
            if (e4.isUnit())
              return true;
            if (0 === e4.compareAbs(2))
              return this.isEven();
            return this.mod(e4).isZero();
          };
          f2.prototype.isDivisibleBy = l2.prototype.isDivisibleBy = c2.prototype.isDivisibleBy;
          function P2(t4) {
            var e4 = t4.abs();
            if (e4.isUnit())
              return false;
            if (e4.equals(2) || e4.equals(3) || e4.equals(5))
              return true;
            if (e4.isEven() || e4.isDivisibleBy(3) || e4.isDivisibleBy(5))
              return false;
            if (e4.lesser(49))
              return true;
          }
          function V2(t4, e4) {
            var r4 = t4.prev(), i4 = r4, s22 = 0, a22, u22, c22;
            while (i4.isEven())
              i4 = i4.divide(2), s22++;
            t:
              for (u22 = 0; u22 < e4.length; u22++) {
                if (t4.lesser(e4[u22]))
                  continue;
                c22 = n2(e4[u22]).modPow(i4, t4);
                if (c22.isUnit() || c22.equals(r4))
                  continue;
                for (a22 = s22 - 1; 0 != a22; a22--) {
                  c22 = c22.square().mod(t4);
                  if (c22.isUnit())
                    return false;
                  if (c22.equals(r4))
                    continue t;
                }
                return false;
              }
            return true;
          }
          c2.prototype.isPrime = function(e4) {
            var r4 = P2(this);
            if (r4 !== t3)
              return r4;
            var i4 = this.abs();
            var s22 = i4.bitLength();
            if (s22 <= 64)
              return V2(i4, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
            var a22 = Math.log(2) * s22.toJSNumber();
            var o22 = Math.ceil(true === e4 ? 2 * Math.pow(a22, 2) : a22);
            for (var u22 = [], c22 = 0; c22 < o22; c22++)
              u22.push(n2(c22 + 2));
            return V2(i4, u22);
          };
          f2.prototype.isPrime = l2.prototype.isPrime = c2.prototype.isPrime;
          c2.prototype.isProbablePrime = function(e4, r4) {
            var i4 = P2(this);
            if (i4 !== t3)
              return i4;
            var s22 = this.abs();
            var a22 = e4 === t3 ? 5 : e4;
            for (var o22 = [], u22 = 0; u22 < a22; u22++)
              o22.push(n2.randBetween(2, s22.minus(2), r4));
            return V2(s22, o22);
          };
          f2.prototype.isProbablePrime = l2.prototype.isProbablePrime = c2.prototype.isProbablePrime;
          c2.prototype.modInv = function(t4) {
            var e4 = n2.zero, r4 = n2.one, i4 = st2(t4), s22 = this.abs(), a22, o22, u22;
            while (!s22.isZero()) {
              a22 = i4.divide(s22);
              o22 = e4;
              u22 = i4;
              e4 = r4;
              i4 = s22;
              r4 = o22.subtract(a22.multiply(r4));
              s22 = u22.subtract(a22.multiply(s22));
            }
            if (!i4.isUnit())
              throw new Error(this.toString() + " and " + t4.toString() + " are not co-prime");
            if (-1 === e4.compare(0))
              e4 = e4.add(t4);
            if (this.isNegative())
              return e4.negate();
            return e4;
          };
          f2.prototype.modInv = l2.prototype.modInv = c2.prototype.modInv;
          c2.prototype.next = function() {
            var t4 = this.value;
            if (this.sign)
              return E2(t4, 1, this.sign);
            return new c2(S2(t4, 1), this.sign);
          };
          l2.prototype.next = function() {
            var t4 = this.value;
            if (t4 + 1 < i3)
              return new l2(t4 + 1);
            return new c2(s2, false);
          };
          f2.prototype.next = function() {
            return new f2(this.value + BigInt(1));
          };
          c2.prototype.prev = function() {
            var t4 = this.value;
            if (this.sign)
              return new c2(S2(t4, 1), true);
            return E2(t4, 1, this.sign);
          };
          l2.prototype.prev = function() {
            var t4 = this.value;
            if (t4 - 1 > -i3)
              return new l2(t4 - 1);
            return new c2(s2, true);
          };
          f2.prototype.prev = function() {
            return new f2(this.value - BigInt(1));
          };
          var L2 = [1];
          while (2 * L2[L2.length - 1] <= e3)
            L2.push(2 * L2[L2.length - 1]);
          var H2 = L2.length, U2 = L2[H2 - 1];
          function K2(t4) {
            return Math.abs(t4) <= e3;
          }
          c2.prototype.shiftLeft = function(t4) {
            var e4 = st2(t4).toJSNumber();
            if (!K2(e4))
              throw new Error(String(e4) + " is too large for shifting.");
            if (e4 < 0)
              return this.shiftRight(-e4);
            var r4 = this;
            if (r4.isZero())
              return r4;
            while (e4 >= H2) {
              r4 = r4.multiply(U2);
              e4 -= H2 - 1;
            }
            return r4.multiply(L2[e4]);
          };
          f2.prototype.shiftLeft = l2.prototype.shiftLeft = c2.prototype.shiftLeft;
          c2.prototype.shiftRight = function(t4) {
            var e4;
            var r4 = st2(t4).toJSNumber();
            if (!K2(r4))
              throw new Error(String(r4) + " is too large for shifting.");
            if (r4 < 0)
              return this.shiftLeft(-r4);
            var i4 = this;
            while (r4 >= H2) {
              if (i4.isZero() || i4.isNegative() && i4.isUnit())
                return i4;
              e4 = C2(i4, U2);
              i4 = e4[1].isNegative() ? e4[0].prev() : e4[0];
              r4 -= H2 - 1;
            }
            e4 = C2(i4, L2[r4]);
            return e4[1].isNegative() ? e4[0].prev() : e4[0];
          };
          f2.prototype.shiftRight = l2.prototype.shiftRight = c2.prototype.shiftRight;
          function j2(t4, e4, r4) {
            e4 = st2(e4);
            var i4 = t4.isNegative(), s22 = e4.isNegative();
            var a22 = i4 ? t4.not() : t4, o22 = s22 ? e4.not() : e4;
            var u22 = 0, c22 = 0;
            var l22 = null, f22 = null;
            var h22 = [];
            while (!a22.isZero() || !o22.isZero()) {
              l22 = C2(a22, U2);
              u22 = l22[1].toJSNumber();
              if (i4)
                u22 = U2 - 1 - u22;
              f22 = C2(o22, U2);
              c22 = f22[1].toJSNumber();
              if (s22)
                c22 = U2 - 1 - c22;
              a22 = l22[0];
              o22 = f22[0];
              h22.push(r4(u22, c22));
            }
            var d22 = 0 !== r4(i4 ? 1 : 0, s22 ? 1 : 0) ? n2(-1) : n2(0);
            for (var v22 = h22.length - 1; v22 >= 0; v22 -= 1)
              d22 = d22.multiply(U2).add(n2(h22[v22]));
            return d22;
          }
          c2.prototype.not = function() {
            return this.negate().prev();
          };
          f2.prototype.not = l2.prototype.not = c2.prototype.not;
          c2.prototype.and = function(t4) {
            return j2(this, t4, function(t5, e4) {
              return t5 & e4;
            });
          };
          f2.prototype.and = l2.prototype.and = c2.prototype.and;
          c2.prototype.or = function(t4) {
            return j2(this, t4, function(t5, e4) {
              return t5 | e4;
            });
          };
          f2.prototype.or = l2.prototype.or = c2.prototype.or;
          c2.prototype.xor = function(t4) {
            return j2(this, t4, function(t5, e4) {
              return t5 ^ e4;
            });
          };
          f2.prototype.xor = l2.prototype.xor = c2.prototype.xor;
          var q2 = 1 << 30, F2 = (e3 & -e3) * (e3 & -e3) | q2;
          function z2(t4) {
            var r4 = t4.value, i4 = "number" === typeof r4 ? r4 | q2 : "bigint" === typeof r4 ? r4 | BigInt(q2) : r4[0] + r4[1] * e3 | F2;
            return i4 & -i4;
          }
          function G2(t4, e4) {
            if (e4.compareTo(t4) <= 0) {
              var r4 = G2(t4, e4.square(e4));
              var i4 = r4.p;
              var s22 = r4.e;
              var a22 = i4.multiply(e4);
              return a22.compareTo(t4) <= 0 ? { p: a22, e: 2 * s22 + 1 } : { p: i4, e: 2 * s22 };
            }
            return { p: n2(1), e: 0 };
          }
          c2.prototype.bitLength = function() {
            var t4 = this;
            if (t4.compareTo(n2(0)) < 0)
              t4 = t4.negate().subtract(n2(1));
            if (0 === t4.compareTo(n2(0)))
              return n2(0);
            return n2(G2(t4, n2(2)).e).add(n2(1));
          };
          f2.prototype.bitLength = l2.prototype.bitLength = c2.prototype.bitLength;
          function Y2(t4, e4) {
            t4 = st2(t4);
            e4 = st2(e4);
            return t4.greater(e4) ? t4 : e4;
          }
          function W2(t4, e4) {
            t4 = st2(t4);
            e4 = st2(e4);
            return t4.lesser(e4) ? t4 : e4;
          }
          function J2(t4, e4) {
            t4 = st2(t4).abs();
            e4 = st2(e4).abs();
            if (t4.equals(e4))
              return t4;
            if (t4.isZero())
              return e4;
            if (e4.isZero())
              return t4;
            var r4 = u2[1], i4, n22;
            while (t4.isEven() && e4.isEven()) {
              i4 = W2(z2(t4), z2(e4));
              t4 = t4.divide(i4);
              e4 = e4.divide(i4);
              r4 = r4.multiply(i4);
            }
            while (t4.isEven())
              t4 = t4.divide(z2(t4));
            do {
              while (e4.isEven())
                e4 = e4.divide(z2(e4));
              if (t4.greater(e4)) {
                n22 = e4;
                e4 = t4;
                t4 = n22;
              }
              e4 = e4.subtract(t4);
            } while (!e4.isZero());
            return r4.isUnit() ? t4 : t4.multiply(r4);
          }
          function Z2(t4, e4) {
            t4 = st2(t4).abs();
            e4 = st2(e4).abs();
            return t4.divide(J2(t4, e4)).multiply(e4);
          }
          function $2(t4, r4, i4) {
            t4 = st2(t4);
            r4 = st2(r4);
            var n22 = i4 || Math.random;
            var s22 = W2(t4, r4), a22 = Y2(t4, r4);
            var o22 = a22.subtract(s22).add(1);
            if (o22.isSmall)
              return s22.add(Math.floor(n22() * o22));
            var c22 = et2(o22, e3).value;
            var l22 = [], f22 = true;
            for (var h22 = 0; h22 < c22.length; h22++) {
              var d22 = f22 ? c22[h22] + (h22 + 1 < c22.length ? c22[h22 + 1] / e3 : 0) : e3;
              var v22 = y2(n22() * d22);
              l22.push(v22);
              if (v22 < c22[h22])
                f22 = false;
            }
            return s22.add(u2.fromArray(l22, e3, false));
          }
          var X2 = function(t4, e4, r4, i4) {
            r4 = r4 || a2;
            t4 = String(t4);
            if (!i4) {
              t4 = t4.toLowerCase();
              r4 = r4.toLowerCase();
            }
            var n22 = t4.length;
            var s22;
            var o22 = Math.abs(e4);
            var u22 = {};
            for (s22 = 0; s22 < r4.length; s22++)
              u22[r4[s22]] = s22;
            for (s22 = 0; s22 < n22; s22++) {
              var c22 = t4[s22];
              if ("-" === c22)
                continue;
              if (c22 in u22) {
                if (u22[c22] >= o22) {
                  if ("1" === c22 && 1 === o22)
                    continue;
                  throw new Error(c22 + " is not a valid digit in base " + e4 + ".");
                }
              }
            }
            e4 = st2(e4);
            var l22 = [];
            var f22 = "-" === t4[0];
            for (s22 = f22 ? 1 : 0; s22 < t4.length; s22++) {
              var c22 = t4[s22];
              if (c22 in u22)
                l22.push(st2(u22[c22]));
              else if ("<" === c22) {
                var h22 = s22;
                do {
                  s22++;
                } while (">" !== t4[s22] && s22 < t4.length);
                l22.push(st2(t4.slice(h22 + 1, s22)));
              } else
                throw new Error(c22 + " is not a valid character");
            }
            return Q2(l22, e4, f22);
          };
          function Q2(t4, e4, r4) {
            var i4 = u2[0], n22 = u2[1], s22;
            for (s22 = t4.length - 1; s22 >= 0; s22--) {
              i4 = i4.add(t4[s22].times(n22));
              n22 = n22.times(e4);
            }
            return r4 ? i4.negate() : i4;
          }
          function tt2(t4, e4) {
            e4 = e4 || a2;
            if (t4 < e4.length)
              return e4[t4];
            return "<" + t4 + ">";
          }
          function et2(t4, e4) {
            e4 = n2(e4);
            if (e4.isZero()) {
              if (t4.isZero())
                return { value: [0], isNegative: false };
              throw new Error("Cannot convert nonzero numbers to base 0.");
            }
            if (e4.equals(-1)) {
              if (t4.isZero())
                return { value: [0], isNegative: false };
              if (t4.isNegative())
                return { value: [].concat.apply([], Array.apply(null, Array(-t4.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };
              var r4 = Array.apply(null, Array(t4.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
              r4.unshift([1]);
              return { value: [].concat.apply([], r4), isNegative: false };
            }
            var i4 = false;
            if (t4.isNegative() && e4.isPositive()) {
              i4 = true;
              t4 = t4.abs();
            }
            if (e4.isUnit()) {
              if (t4.isZero())
                return { value: [0], isNegative: false };
              return { value: Array.apply(null, Array(t4.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: i4 };
            }
            var s22 = [];
            var a22 = t4, o22;
            while (a22.isNegative() || a22.compareAbs(e4) >= 0) {
              o22 = a22.divmod(e4);
              a22 = o22.quotient;
              var u22 = o22.remainder;
              if (u22.isNegative()) {
                u22 = e4.minus(u22).abs();
                a22 = a22.next();
              }
              s22.push(u22.toJSNumber());
            }
            s22.push(a22.toJSNumber());
            return { value: s22.reverse(), isNegative: i4 };
          }
          function rt2(t4, e4, r4) {
            var i4 = et2(t4, e4);
            return (i4.isNegative ? "-" : "") + i4.value.map(function(t5) {
              return tt2(t5, r4);
            }).join("");
          }
          c2.prototype.toArray = function(t4) {
            return et2(this, t4);
          };
          l2.prototype.toArray = function(t4) {
            return et2(this, t4);
          };
          f2.prototype.toArray = function(t4) {
            return et2(this, t4);
          };
          c2.prototype.toString = function(e4, r4) {
            if (e4 === t3)
              e4 = 10;
            if (10 !== e4)
              return rt2(this, e4, r4);
            var i4 = this.value, n22 = i4.length, s22 = String(i4[--n22]), a22 = "0000000", o22;
            while (--n22 >= 0) {
              o22 = String(i4[n22]);
              s22 += a22.slice(o22.length) + o22;
            }
            var u22 = this.sign ? "-" : "";
            return u22 + s22;
          };
          l2.prototype.toString = function(e4, r4) {
            if (e4 === t3)
              e4 = 10;
            if (10 != e4)
              return rt2(this, e4, r4);
            return String(this.value);
          };
          f2.prototype.toString = l2.prototype.toString;
          f2.prototype.toJSON = c2.prototype.toJSON = l2.prototype.toJSON = function() {
            return this.toString();
          };
          c2.prototype.valueOf = function() {
            return parseInt(this.toString(), 10);
          };
          c2.prototype.toJSNumber = c2.prototype.valueOf;
          l2.prototype.valueOf = function() {
            return this.value;
          };
          l2.prototype.toJSNumber = l2.prototype.valueOf;
          f2.prototype.valueOf = f2.prototype.toJSNumber = function() {
            return parseInt(this.toString(), 10);
          };
          function it2(t4) {
            if (h2(+t4)) {
              var e4 = +t4;
              if (e4 === y2(e4))
                return o2 ? new f2(BigInt(e4)) : new l2(e4);
              throw new Error("Invalid integer: " + t4);
            }
            var i4 = "-" === t4[0];
            if (i4)
              t4 = t4.slice(1);
            var n22 = t4.split(/e/i);
            if (n22.length > 2)
              throw new Error("Invalid integer: " + n22.join("e"));
            if (2 === n22.length) {
              var s22 = n22[1];
              if ("+" === s22[0])
                s22 = s22.slice(1);
              s22 = +s22;
              if (s22 !== y2(s22) || !h2(s22))
                throw new Error("Invalid integer: " + s22 + " is not a valid exponent.");
              var a22 = n22[0];
              var u22 = a22.indexOf(".");
              if (u22 >= 0) {
                s22 -= a22.length - u22 - 1;
                a22 = a22.slice(0, u22) + a22.slice(u22 + 1);
              }
              if (s22 < 0)
                throw new Error("Cannot include negative exponent part for integers");
              a22 += new Array(s22 + 1).join("0");
              t4 = a22;
            }
            var d22 = /^([0-9][0-9]*)$/.test(t4);
            if (!d22)
              throw new Error("Invalid integer: " + t4);
            if (o2)
              return new f2(BigInt(i4 ? "-" + t4 : t4));
            var v22 = [], g22 = t4.length, m22 = r3, w22 = g22 - m22;
            while (g22 > 0) {
              v22.push(+t4.slice(w22, g22));
              w22 -= m22;
              if (w22 < 0)
                w22 = 0;
              g22 -= m22;
            }
            p2(v22);
            return new c2(v22, i4);
          }
          function nt2(t4) {
            if (o2)
              return new f2(BigInt(t4));
            if (h2(t4)) {
              if (t4 !== y2(t4))
                throw new Error(t4 + " is not an integer.");
              return new l2(t4);
            }
            return it2(t4.toString());
          }
          function st2(t4) {
            if ("number" === typeof t4)
              return nt2(t4);
            if ("string" === typeof t4)
              return it2(t4);
            if ("bigint" === typeof t4)
              return new f2(t4);
            return t4;
          }
          for (var at2 = 0; at2 < 1e3; at2++) {
            u2[at2] = st2(at2);
            if (at2 > 0)
              u2[-at2] = st2(-at2);
          }
          u2.one = u2[1];
          u2.zero = u2[0];
          u2.minusOne = u2[-1];
          u2.max = Y2;
          u2.min = W2;
          u2.gcd = J2;
          u2.lcm = Z2;
          u2.isInstance = function(t4) {
            return t4 instanceof c2 || t4 instanceof l2 || t4 instanceof f2;
          };
          u2.randBetween = $2;
          u2.fromArray = function(t4, e4, r4) {
            return Q2(t4.map(st2), st2(e4 || 10), r4);
          };
          return u2;
        }();
        if (t22.hasOwnProperty("exports"))
          t22.exports = n2;
        i22 = (function() {
          return n2;
        }).call(e22, r22, e22, t22), void 0 !== i22 && (t22.exports = i22);
      }, 452: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.BlockCipher;
            var n2 = e3.algo;
            var s2 = [];
            var a2 = [];
            var o2 = [];
            var u2 = [];
            var c2 = [];
            var l2 = [];
            var f2 = [];
            var h2 = [];
            var d2 = [];
            var v2 = [];
            (function() {
              var t4 = [];
              for (var e4 = 0; e4 < 256; e4++)
                if (e4 < 128)
                  t4[e4] = e4 << 1;
                else
                  t4[e4] = e4 << 1 ^ 283;
              var r4 = 0;
              var i3 = 0;
              for (var e4 = 0; e4 < 256; e4++) {
                var n22 = i3 ^ i3 << 1 ^ i3 << 2 ^ i3 << 3 ^ i3 << 4;
                n22 = n22 >>> 8 ^ 255 & n22 ^ 99;
                s2[r4] = n22;
                a2[n22] = r4;
                var p22 = t4[r4];
                var g22 = t4[p22];
                var y2 = t4[g22];
                var m2 = 257 * t4[n22] ^ 16843008 * n22;
                o2[r4] = m2 << 24 | m2 >>> 8;
                u2[r4] = m2 << 16 | m2 >>> 16;
                c2[r4] = m2 << 8 | m2 >>> 24;
                l2[r4] = m2;
                var m2 = 16843009 * y2 ^ 65537 * g22 ^ 257 * p22 ^ 16843008 * r4;
                f2[n22] = m2 << 24 | m2 >>> 8;
                h2[n22] = m2 << 16 | m2 >>> 16;
                d2[n22] = m2 << 8 | m2 >>> 24;
                v2[n22] = m2;
                if (!r4)
                  r4 = i3 = 1;
                else {
                  r4 = p22 ^ t4[t4[t4[y2 ^ p22]]];
                  i3 ^= t4[t4[i3]];
                }
              }
            })();
            var p2 = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
            var g2 = n2.AES = i22.extend({ _doReset: function() {
              var t4;
              if (this._nRounds && this._keyPriorReset === this._key)
                return;
              var e4 = this._keyPriorReset = this._key;
              var r4 = e4.words;
              var i3 = e4.sigBytes / 4;
              var n22 = this._nRounds = i3 + 6;
              var a22 = 4 * (n22 + 1);
              var o22 = this._keySchedule = [];
              for (var u22 = 0; u22 < a22; u22++)
                if (u22 < i3)
                  o22[u22] = r4[u22];
                else {
                  t4 = o22[u22 - 1];
                  if (!(u22 % i3)) {
                    t4 = t4 << 8 | t4 >>> 24;
                    t4 = s2[t4 >>> 24] << 24 | s2[t4 >>> 16 & 255] << 16 | s2[t4 >>> 8 & 255] << 8 | s2[255 & t4];
                    t4 ^= p2[u22 / i3 | 0] << 24;
                  } else if (i3 > 6 && u22 % i3 == 4)
                    t4 = s2[t4 >>> 24] << 24 | s2[t4 >>> 16 & 255] << 16 | s2[t4 >>> 8 & 255] << 8 | s2[255 & t4];
                  o22[u22] = o22[u22 - i3] ^ t4;
                }
              var c22 = this._invKeySchedule = [];
              for (var l22 = 0; l22 < a22; l22++) {
                var u22 = a22 - l22;
                if (l22 % 4)
                  var t4 = o22[u22];
                else
                  var t4 = o22[u22 - 4];
                if (l22 < 4 || u22 <= 4)
                  c22[l22] = t4;
                else
                  c22[l22] = f2[s2[t4 >>> 24]] ^ h2[s2[t4 >>> 16 & 255]] ^ d2[s2[t4 >>> 8 & 255]] ^ v2[s2[255 & t4]];
              }
            }, encryptBlock: function(t4, e4) {
              this._doCryptBlock(t4, e4, this._keySchedule, o2, u2, c2, l2, s2);
            }, decryptBlock: function(t4, e4) {
              var r4 = t4[e4 + 1];
              t4[e4 + 1] = t4[e4 + 3];
              t4[e4 + 3] = r4;
              this._doCryptBlock(t4, e4, this._invKeySchedule, f2, h2, d2, v2, a2);
              var r4 = t4[e4 + 1];
              t4[e4 + 1] = t4[e4 + 3];
              t4[e4 + 3] = r4;
            }, _doCryptBlock: function(t4, e4, r4, i3, n22, s22, a22, o22) {
              var u22 = this._nRounds;
              var c22 = t4[e4] ^ r4[0];
              var l22 = t4[e4 + 1] ^ r4[1];
              var f22 = t4[e4 + 2] ^ r4[2];
              var h22 = t4[e4 + 3] ^ r4[3];
              var d22 = 4;
              for (var v22 = 1; v22 < u22; v22++) {
                var p22 = i3[c22 >>> 24] ^ n22[l22 >>> 16 & 255] ^ s22[f22 >>> 8 & 255] ^ a22[255 & h22] ^ r4[d22++];
                var g22 = i3[l22 >>> 24] ^ n22[f22 >>> 16 & 255] ^ s22[h22 >>> 8 & 255] ^ a22[255 & c22] ^ r4[d22++];
                var y2 = i3[f22 >>> 24] ^ n22[h22 >>> 16 & 255] ^ s22[c22 >>> 8 & 255] ^ a22[255 & l22] ^ r4[d22++];
                var m2 = i3[h22 >>> 24] ^ n22[c22 >>> 16 & 255] ^ s22[l22 >>> 8 & 255] ^ a22[255 & f22] ^ r4[d22++];
                c22 = p22;
                l22 = g22;
                f22 = y2;
                h22 = m2;
              }
              var p22 = (o22[c22 >>> 24] << 24 | o22[l22 >>> 16 & 255] << 16 | o22[f22 >>> 8 & 255] << 8 | o22[255 & h22]) ^ r4[d22++];
              var g22 = (o22[l22 >>> 24] << 24 | o22[f22 >>> 16 & 255] << 16 | o22[h22 >>> 8 & 255] << 8 | o22[255 & c22]) ^ r4[d22++];
              var y2 = (o22[f22 >>> 24] << 24 | o22[h22 >>> 16 & 255] << 16 | o22[c22 >>> 8 & 255] << 8 | o22[255 & l22]) ^ r4[d22++];
              var m2 = (o22[h22 >>> 24] << 24 | o22[c22 >>> 16 & 255] << 16 | o22[l22 >>> 8 & 255] << 8 | o22[255 & f22]) ^ r4[d22++];
              t4[e4] = p22;
              t4[e4 + 1] = g22;
              t4[e4 + 2] = y2;
              t4[e4 + 3] = m2;
            }, keySize: 256 / 32 });
            e3.AES = i22._createHelper(g2);
          })();
          return t3.AES;
        });
      }, 5109: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(888));
        })(this, function(t3) {
          t3.lib.Cipher || function(e3) {
            var r3 = t3;
            var i22 = r3.lib;
            var n2 = i22.Base;
            var s2 = i22.WordArray;
            var a2 = i22.BufferedBlockAlgorithm;
            var o2 = r3.enc;
            o2.Utf8;
            var c2 = o2.Base64;
            var l2 = r3.algo;
            var f2 = l2.EvpKDF;
            var h2 = i22.Cipher = a2.extend({ cfg: n2.extend(), createEncryptor: function(t4, e4) {
              return this.create(this._ENC_XFORM_MODE, t4, e4);
            }, createDecryptor: function(t4, e4) {
              return this.create(this._DEC_XFORM_MODE, t4, e4);
            }, init: function(t4, e4, r4) {
              this.cfg = this.cfg.extend(r4);
              this._xformMode = t4;
              this._key = e4;
              this.reset();
            }, reset: function() {
              a2.reset.call(this);
              this._doReset();
            }, process: function(t4) {
              this._append(t4);
              return this._process();
            }, finalize: function(t4) {
              if (t4)
                this._append(t4);
              var e4 = this._doFinalize();
              return e4;
            }, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: /* @__PURE__ */ function() {
              function t4(t5) {
                if ("string" == typeof t5)
                  return T2;
                else
                  return E2;
              }
              return function(e4) {
                return { encrypt: function(r4, i3, n22) {
                  return t4(i3).encrypt(e4, r4, i3, n22);
                }, decrypt: function(r4, i3, n22) {
                  return t4(i3).decrypt(e4, r4, i3, n22);
                } };
              };
            }() });
            i22.StreamCipher = h2.extend({ _doFinalize: function() {
              var t4 = this._process(true);
              return t4;
            }, blockSize: 1 });
            var v2 = r3.mode = {};
            var p2 = i22.BlockCipherMode = n2.extend({ createEncryptor: function(t4, e4) {
              return this.Encryptor.create(t4, e4);
            }, createDecryptor: function(t4, e4) {
              return this.Decryptor.create(t4, e4);
            }, init: function(t4, e4) {
              this._cipher = t4;
              this._iv = e4;
            } });
            var g2 = v2.CBC = function() {
              var t4 = p2.extend();
              t4.Encryptor = t4.extend({ processBlock: function(t5, e4) {
                var i3 = this._cipher;
                var n22 = i3.blockSize;
                r4.call(this, t5, e4, n22);
                i3.encryptBlock(t5, e4);
                this._prevBlock = t5.slice(e4, e4 + n22);
              } });
              t4.Decryptor = t4.extend({ processBlock: function(t5, e4) {
                var i3 = this._cipher;
                var n22 = i3.blockSize;
                var s22 = t5.slice(e4, e4 + n22);
                i3.decryptBlock(t5, e4);
                r4.call(this, t5, e4, n22);
                this._prevBlock = s22;
              } });
              function r4(t5, r5, i3) {
                var n22;
                var s22 = this._iv;
                if (s22) {
                  n22 = s22;
                  this._iv = e3;
                } else
                  n22 = this._prevBlock;
                for (var a22 = 0; a22 < i3; a22++)
                  t5[r5 + a22] ^= n22[a22];
              }
              return t4;
            }();
            var y2 = r3.pad = {};
            var m2 = y2.Pkcs7 = { pad: function(t4, e4) {
              var r4 = 4 * e4;
              var i3 = r4 - t4.sigBytes % r4;
              var n22 = i3 << 24 | i3 << 16 | i3 << 8 | i3;
              var a22 = [];
              for (var o22 = 0; o22 < i3; o22 += 4)
                a22.push(n22);
              var u2 = s2.create(a22, i3);
              t4.concat(u2);
            }, unpad: function(t4) {
              var e4 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
              t4.sigBytes -= e4;
            } };
            i22.BlockCipher = h2.extend({ cfg: h2.cfg.extend({ mode: g2, padding: m2 }), reset: function() {
              var t4;
              h2.reset.call(this);
              var e4 = this.cfg;
              var r4 = e4.iv;
              var i3 = e4.mode;
              if (this._xformMode == this._ENC_XFORM_MODE)
                t4 = i3.createEncryptor;
              else {
                t4 = i3.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == t4)
                this._mode.init(this, r4 && r4.words);
              else {
                this._mode = t4.call(i3, this, r4 && r4.words);
                this._mode.__creator = t4;
              }
            }, _doProcessBlock: function(t4, e4) {
              this._mode.processBlock(t4, e4);
            }, _doFinalize: function() {
              var t4;
              var e4 = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                e4.pad(this._data, this.blockSize);
                t4 = this._process(true);
              } else {
                t4 = this._process(true);
                e4.unpad(t4);
              }
              return t4;
            }, blockSize: 128 / 32 });
            var S2 = i22.CipherParams = n2.extend({ init: function(t4) {
              this.mixIn(t4);
            }, toString: function(t4) {
              return (t4 || this.formatter).stringify(this);
            } });
            var _2 = r3.format = {};
            var b2 = _2.OpenSSL = { stringify: function(t4) {
              var e4;
              var r4 = t4.ciphertext;
              var i3 = t4.salt;
              if (i3)
                e4 = s2.create([1398893684, 1701076831]).concat(i3).concat(r4);
              else
                e4 = r4;
              return e4.toString(c2);
            }, parse: function(t4) {
              var e4;
              var r4 = c2.parse(t4);
              var i3 = r4.words;
              if (1398893684 == i3[0] && 1701076831 == i3[1]) {
                e4 = s2.create(i3.slice(2, 4));
                i3.splice(0, 4);
                r4.sigBytes -= 16;
              }
              return S2.create({ ciphertext: r4, salt: e4 });
            } };
            var E2 = i22.SerializableCipher = n2.extend({ cfg: n2.extend({ format: b2 }), encrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              var n22 = t4.createEncryptor(r4, i3);
              var s22 = n22.finalize(e4);
              var a22 = n22.cfg;
              return S2.create({ ciphertext: s22, key: r4, iv: a22.iv, algorithm: t4, mode: a22.mode, padding: a22.padding, blockSize: t4.blockSize, formatter: i3.format });
            }, decrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              e4 = this._parse(e4, i3.format);
              var n22 = t4.createDecryptor(r4, i3).finalize(e4.ciphertext);
              return n22;
            }, _parse: function(t4, e4) {
              if ("string" == typeof t4)
                return e4.parse(t4, this);
              else
                return t4;
            } });
            var D2 = r3.kdf = {};
            var M2 = D2.OpenSSL = { execute: function(t4, e4, r4, i3) {
              if (!i3)
                i3 = s2.random(64 / 8);
              var n22 = f2.create({ keySize: e4 + r4 }).compute(t4, i3);
              var a22 = s2.create(n22.words.slice(e4), 4 * r4);
              n22.sigBytes = 4 * e4;
              return S2.create({ key: n22, iv: a22, salt: i3 });
            } };
            var T2 = i22.PasswordBasedCipher = E2.extend({ cfg: E2.cfg.extend({ kdf: M2 }), encrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              var n22 = i3.kdf.execute(r4, t4.keySize, t4.ivSize);
              i3.iv = n22.iv;
              var s22 = E2.encrypt.call(this, t4, e4, n22.key, i3);
              s22.mixIn(n22);
              return s22;
            }, decrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              e4 = this._parse(e4, i3.format);
              var n22 = i3.kdf.execute(r4, t4.keySize, t4.ivSize, e4.salt);
              i3.iv = n22.iv;
              var s22 = E2.decrypt.call(this, t4, e4, n22.key, i3);
              return s22;
            } });
          }();
        });
      }, 8249: function(t22, e22, r22) {
        (function(r3, i22) {
          t22.exports = i22();
        })(this, function() {
          var t3 = t3 || function(t4, e3) {
            var i22;
            if ("undefined" !== typeof window && $inject_window_crypto)
              i22 = $inject_window_crypto;
            if ("undefined" !== typeof self && self.crypto)
              i22 = self.crypto;
            if ("undefined" !== typeof globalThis && globalThis.crypto)
              i22 = globalThis.crypto;
            if (!i22 && "undefined" !== typeof window && window.msCrypto)
              i22 = window.msCrypto;
            if (!i22 && "undefined" !== typeof r22.g && r22.g.crypto)
              i22 = r22.g.crypto;
            if (!i22 && true)
              try {
                i22 = r22(2480);
              } catch (t5) {
              }
            var n2 = function() {
              if (i22) {
                if ("function" === typeof i22.getRandomValues)
                  try {
                    return i22.getRandomValues(new Uint32Array(1))[0];
                  } catch (t5) {
                  }
                if ("function" === typeof i22.randomBytes)
                  try {
                    return i22.randomBytes(4).readInt32LE();
                  } catch (t5) {
                  }
              }
              throw new Error("Native crypto module could not be used to get secure random number.");
            };
            var s2 = Object.create || /* @__PURE__ */ function() {
              function t5() {
              }
              return function(e4) {
                var r3;
                t5.prototype = e4;
                r3 = new t5();
                t5.prototype = null;
                return r3;
              };
            }();
            var a2 = {};
            var o2 = a2.lib = {};
            var u2 = o2.Base = /* @__PURE__ */ function() {
              return { extend: function(t5) {
                var e4 = s2(this);
                if (t5)
                  e4.mixIn(t5);
                if (!e4.hasOwnProperty("init") || this.init === e4.init)
                  e4.init = function() {
                    e4.$super.init.apply(this, arguments);
                  };
                e4.init.prototype = e4;
                e4.$super = this;
                return e4;
              }, create: function() {
                var t5 = this.extend();
                t5.init.apply(t5, arguments);
                return t5;
              }, init: function() {
              }, mixIn: function(t5) {
                for (var e4 in t5)
                  if (t5.hasOwnProperty(e4))
                    this[e4] = t5[e4];
                if (t5.hasOwnProperty("toString"))
                  this.toString = t5.toString;
              }, clone: function() {
                return this.init.prototype.extend(this);
              } };
            }();
            var c2 = o2.WordArray = u2.extend({ init: function(t5, r3) {
              t5 = this.words = t5 || [];
              if (r3 != e3)
                this.sigBytes = r3;
              else
                this.sigBytes = 4 * t5.length;
            }, toString: function(t5) {
              return (t5 || f2).stringify(this);
            }, concat: function(t5) {
              var e4 = this.words;
              var r3 = t5.words;
              var i3 = this.sigBytes;
              var n22 = t5.sigBytes;
              this.clamp();
              if (i3 % 4)
                for (var s22 = 0; s22 < n22; s22++) {
                  var a22 = r3[s22 >>> 2] >>> 24 - s22 % 4 * 8 & 255;
                  e4[i3 + s22 >>> 2] |= a22 << 24 - (i3 + s22) % 4 * 8;
                }
              else
                for (var o22 = 0; o22 < n22; o22 += 4)
                  e4[i3 + o22 >>> 2] = r3[o22 >>> 2];
              this.sigBytes += n22;
              return this;
            }, clamp: function() {
              var e4 = this.words;
              var r3 = this.sigBytes;
              e4[r3 >>> 2] &= 4294967295 << 32 - r3 % 4 * 8;
              e4.length = t4.ceil(r3 / 4);
            }, clone: function() {
              var t5 = u2.clone.call(this);
              t5.words = this.words.slice(0);
              return t5;
            }, random: function(t5) {
              var e4 = [];
              for (var r3 = 0; r3 < t5; r3 += 4)
                e4.push(n2());
              return new c2.init(e4, t5);
            } });
            var l2 = a2.enc = {};
            var f2 = l2.Hex = { stringify: function(t5) {
              var e4 = t5.words;
              var r3 = t5.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r3; n22++) {
                var s22 = e4[n22 >>> 2] >>> 24 - n22 % 4 * 8 & 255;
                i3.push((s22 >>> 4).toString(16));
                i3.push((15 & s22).toString(16));
              }
              return i3.join("");
            }, parse: function(t5) {
              var e4 = t5.length;
              var r3 = [];
              for (var i3 = 0; i3 < e4; i3 += 2)
                r3[i3 >>> 3] |= parseInt(t5.substr(i3, 2), 16) << 24 - i3 % 8 * 4;
              return new c2.init(r3, e4 / 2);
            } };
            var h2 = l2.Latin1 = { stringify: function(t5) {
              var e4 = t5.words;
              var r3 = t5.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r3; n22++) {
                var s22 = e4[n22 >>> 2] >>> 24 - n22 % 4 * 8 & 255;
                i3.push(String.fromCharCode(s22));
              }
              return i3.join("");
            }, parse: function(t5) {
              var e4 = t5.length;
              var r3 = [];
              for (var i3 = 0; i3 < e4; i3++)
                r3[i3 >>> 2] |= (255 & t5.charCodeAt(i3)) << 24 - i3 % 4 * 8;
              return new c2.init(r3, e4);
            } };
            var d2 = l2.Utf8 = { stringify: function(t5) {
              try {
                return decodeURIComponent(escape(h2.stringify(t5)));
              } catch (t6) {
                throw new Error("Malformed UTF-8 data");
              }
            }, parse: function(t5) {
              return h2.parse(unescape(encodeURIComponent(t5)));
            } };
            var v2 = o2.BufferedBlockAlgorithm = u2.extend({ reset: function() {
              this._data = new c2.init();
              this._nDataBytes = 0;
            }, _append: function(t5) {
              if ("string" == typeof t5)
                t5 = d2.parse(t5);
              this._data.concat(t5);
              this._nDataBytes += t5.sigBytes;
            }, _process: function(e4) {
              var r3;
              var i3 = this._data;
              var n22 = i3.words;
              var s22 = i3.sigBytes;
              var a22 = this.blockSize;
              var o22 = 4 * a22;
              var u22 = s22 / o22;
              if (e4)
                u22 = t4.ceil(u22);
              else
                u22 = t4.max((0 | u22) - this._minBufferSize, 0);
              var l22 = u22 * a22;
              var f22 = t4.min(4 * l22, s22);
              if (l22) {
                for (var h22 = 0; h22 < l22; h22 += a22)
                  this._doProcessBlock(n22, h22);
                r3 = n22.splice(0, l22);
                i3.sigBytes -= f22;
              }
              return new c2.init(r3, f22);
            }, clone: function() {
              var t5 = u2.clone.call(this);
              t5._data = this._data.clone();
              return t5;
            }, _minBufferSize: 0 });
            o2.Hasher = v2.extend({ cfg: u2.extend(), init: function(t5) {
              this.cfg = this.cfg.extend(t5);
              this.reset();
            }, reset: function() {
              v2.reset.call(this);
              this._doReset();
            }, update: function(t5) {
              this._append(t5);
              this._process();
              return this;
            }, finalize: function(t5) {
              if (t5)
                this._append(t5);
              var e4 = this._doFinalize();
              return e4;
            }, blockSize: 512 / 32, _createHelper: function(t5) {
              return function(e4, r3) {
                return new t5.init(r3).finalize(e4);
              };
            }, _createHmacHelper: function(t5) {
              return function(e4, r3) {
                return new g2.HMAC.init(t5, r3).finalize(e4);
              };
            } });
            var g2 = a2.algo = {};
            return a2;
          }(Math);
          return t3;
        });
      }, 8269: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.WordArray;
            var n2 = e3.enc;
            n2.Base64 = { stringify: function(t4) {
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = this._map;
              t4.clamp();
              var n22 = [];
              for (var s2 = 0; s2 < r4; s2 += 3) {
                var a22 = e4[s2 >>> 2] >>> 24 - s2 % 4 * 8 & 255;
                var o2 = e4[s2 + 1 >>> 2] >>> 24 - (s2 + 1) % 4 * 8 & 255;
                var u2 = e4[s2 + 2 >>> 2] >>> 24 - (s2 + 2) % 4 * 8 & 255;
                var c2 = a22 << 16 | o2 << 8 | u2;
                for (var l2 = 0; l2 < 4 && s2 + 0.75 * l2 < r4; l2++)
                  n22.push(i3.charAt(c2 >>> 6 * (3 - l2) & 63));
              }
              var f2 = i3.charAt(64);
              if (f2)
                while (n22.length % 4)
                  n22.push(f2);
              return n22.join("");
            }, parse: function(t4) {
              var e4 = t4.length;
              var r4 = this._map;
              var i3 = this._reverseMap;
              if (!i3) {
                i3 = this._reverseMap = [];
                for (var n22 = 0; n22 < r4.length; n22++)
                  i3[r4.charCodeAt(n22)] = n22;
              }
              var s2 = r4.charAt(64);
              if (s2) {
                var o2 = t4.indexOf(s2);
                if (-1 !== o2)
                  e4 = o2;
              }
              return a2(t4, e4, i3);
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
            function a2(t4, e4, r4) {
              var n22 = [];
              var s2 = 0;
              for (var a22 = 0; a22 < e4; a22++)
                if (a22 % 4) {
                  var o2 = r4[t4.charCodeAt(a22 - 1)] << a22 % 4 * 2;
                  var u2 = r4[t4.charCodeAt(a22)] >>> 6 - a22 % 4 * 2;
                  var c2 = o2 | u2;
                  n22[s2 >>> 2] |= c2 << 24 - s2 % 4 * 8;
                  s2++;
                }
              return i22.create(n22, s2);
            }
          })();
          return t3.enc.Base64;
        });
      }, 3786: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.WordArray;
            var n2 = e3.enc;
            n2.Base64url = { stringify: function(t4, e4 = true) {
              var r4 = t4.words;
              var i3 = t4.sigBytes;
              var n22 = e4 ? this._safe_map : this._map;
              t4.clamp();
              var s2 = [];
              for (var a22 = 0; a22 < i3; a22 += 3) {
                var o2 = r4[a22 >>> 2] >>> 24 - a22 % 4 * 8 & 255;
                var u2 = r4[a22 + 1 >>> 2] >>> 24 - (a22 + 1) % 4 * 8 & 255;
                var c2 = r4[a22 + 2 >>> 2] >>> 24 - (a22 + 2) % 4 * 8 & 255;
                var l2 = o2 << 16 | u2 << 8 | c2;
                for (var f2 = 0; f2 < 4 && a22 + 0.75 * f2 < i3; f2++)
                  s2.push(n22.charAt(l2 >>> 6 * (3 - f2) & 63));
              }
              var h2 = n22.charAt(64);
              if (h2)
                while (s2.length % 4)
                  s2.push(h2);
              return s2.join("");
            }, parse: function(t4, e4 = true) {
              var r4 = t4.length;
              var i3 = e4 ? this._safe_map : this._map;
              var n22 = this._reverseMap;
              if (!n22) {
                n22 = this._reverseMap = [];
                for (var s2 = 0; s2 < i3.length; s2++)
                  n22[i3.charCodeAt(s2)] = s2;
              }
              var o2 = i3.charAt(64);
              if (o2) {
                var u2 = t4.indexOf(o2);
                if (-1 !== u2)
                  r4 = u2;
              }
              return a2(t4, r4, n22);
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" };
            function a2(t4, e4, r4) {
              var n22 = [];
              var s2 = 0;
              for (var a22 = 0; a22 < e4; a22++)
                if (a22 % 4) {
                  var o2 = r4[t4.charCodeAt(a22 - 1)] << a22 % 4 * 2;
                  var u2 = r4[t4.charCodeAt(a22)] >>> 6 - a22 % 4 * 2;
                  var c2 = o2 | u2;
                  n22[s2 >>> 2] |= c2 << 24 - s2 % 4 * 8;
                  s2++;
                }
              return i22.create(n22, s2);
            }
          })();
          return t3.enc.Base64url;
        });
      }, 298: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.WordArray;
            var n2 = e3.enc;
            n2.Utf16 = n2.Utf16BE = { stringify: function(t4) {
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r4; n22 += 2) {
                var s2 = e4[n22 >>> 2] >>> 16 - n22 % 4 * 8 & 65535;
                i3.push(String.fromCharCode(s2));
              }
              return i3.join("");
            }, parse: function(t4) {
              var e4 = t4.length;
              var r4 = [];
              for (var n22 = 0; n22 < e4; n22++)
                r4[n22 >>> 1] |= t4.charCodeAt(n22) << 16 - n22 % 2 * 16;
              return i22.create(r4, 2 * e4);
            } };
            n2.Utf16LE = { stringify: function(t4) {
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r4; n22 += 2) {
                var s2 = a2(e4[n22 >>> 2] >>> 16 - n22 % 4 * 8 & 65535);
                i3.push(String.fromCharCode(s2));
              }
              return i3.join("");
            }, parse: function(t4) {
              var e4 = t4.length;
              var r4 = [];
              for (var n22 = 0; n22 < e4; n22++)
                r4[n22 >>> 1] |= a2(t4.charCodeAt(n22) << 16 - n22 % 2 * 16);
              return i22.create(r4, 2 * e4);
            } };
            function a2(t4) {
              return t4 << 8 & 4278255360 | t4 >>> 8 & 16711935;
            }
          })();
          return t3.enc.Utf16;
        });
      }, 888: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(2783), r22(9824));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.Base;
            var n2 = r3.WordArray;
            var s2 = e3.algo;
            var a2 = s2.MD5;
            var o2 = s2.EvpKDF = i22.extend({ cfg: i22.extend({ keySize: 128 / 32, hasher: a2, iterations: 1 }), init: function(t4) {
              this.cfg = this.cfg.extend(t4);
            }, compute: function(t4, e4) {
              var r4;
              var i3 = this.cfg;
              var s22 = i3.hasher.create();
              var a22 = n2.create();
              var o22 = a22.words;
              var u2 = i3.keySize;
              var c2 = i3.iterations;
              while (o22.length < u2) {
                if (r4)
                  s22.update(r4);
                r4 = s22.update(t4).finalize(e4);
                s22.reset();
                for (var l2 = 1; l2 < c2; l2++) {
                  r4 = s22.finalize(r4);
                  s22.reset();
                }
                a22.concat(r4);
              }
              a22.sigBytes = 4 * u2;
              return a22;
            } });
            e3.EvpKDF = function(t4, e4, r4) {
              return o2.create(r4).compute(t4, e4);
            };
          })();
          return t3.EvpKDF;
        });
      }, 2209: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i22 = r3.lib;
            var n2 = i22.CipherParams;
            var s2 = r3.enc;
            var a2 = s2.Hex;
            var o2 = r3.format;
            o2.Hex = { stringify: function(t4) {
              return t4.ciphertext.toString(a2);
            }, parse: function(t4) {
              var e4 = a2.parse(t4);
              return n2.create({ ciphertext: e4 });
            } };
          })();
          return t3.format.Hex;
        });
      }, 9824: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.Base;
            var n2 = e3.enc;
            var s2 = n2.Utf8;
            var a2 = e3.algo;
            a2.HMAC = i22.extend({ init: function(t4, e4) {
              t4 = this._hasher = new t4.init();
              if ("string" == typeof e4)
                e4 = s2.parse(e4);
              var r4 = t4.blockSize;
              var i3 = 4 * r4;
              if (e4.sigBytes > i3)
                e4 = t4.finalize(e4);
              e4.clamp();
              var n22 = this._oKey = e4.clone();
              var a22 = this._iKey = e4.clone();
              var o2 = n22.words;
              var u2 = a22.words;
              for (var c2 = 0; c2 < r4; c2++) {
                o2[c2] ^= 1549556828;
                u2[c2] ^= 909522486;
              }
              n22.sigBytes = a22.sigBytes = i3;
              this.reset();
            }, reset: function() {
              var t4 = this._hasher;
              t4.reset();
              t4.update(this._iKey);
            }, update: function(t4) {
              this._hasher.update(t4);
              return this;
            }, finalize: function(t4) {
              var e4 = this._hasher;
              var r4 = e4.finalize(t4);
              e4.reset();
              var i3 = e4.finalize(this._oKey.clone().concat(r4));
              return i3;
            } });
          })();
        });
      }, 1354: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(4938), r22(4433), r22(298), r22(8269), r22(3786), r22(8214), r22(2783), r22(2153), r22(7792), r22(34), r22(7460), r22(3327), r22(706), r22(9824), r22(2112), r22(888), r22(5109), r22(8568), r22(4242), r22(9968), r22(7660), r22(1148), r22(3615), r22(2807), r22(1077), r22(6475), r22(6991), r22(2209), r22(452), r22(4253), r22(1857), r22(4454), r22(3974));
        })(this, function(t3) {
          return t3;
        });
      }, 4433: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function() {
            if ("function" != typeof ArrayBuffer)
              return;
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.WordArray;
            var n2 = i22.init;
            var s2 = i22.init = function(t4) {
              if (t4 instanceof ArrayBuffer)
                t4 = new Uint8Array(t4);
              if (t4 instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && t4 instanceof Uint8ClampedArray || t4 instanceof Int16Array || t4 instanceof Uint16Array || t4 instanceof Int32Array || t4 instanceof Uint32Array || t4 instanceof Float32Array || t4 instanceof Float64Array)
                t4 = new Uint8Array(t4.buffer, t4.byteOffset, t4.byteLength);
              if (t4 instanceof Uint8Array) {
                var e4 = t4.byteLength;
                var r4 = [];
                for (var i3 = 0; i3 < e4; i3++)
                  r4[i3 >>> 2] |= t4[i3] << 24 - i3 % 4 * 8;
                n2.call(this, r4, e4);
              } else
                n2.apply(this, arguments);
            };
            s2.prototype = i22;
          })();
          return t3.lib.WordArray;
        });
      }, 8214: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i22 = r3.lib;
            var n2 = i22.WordArray;
            var s2 = i22.Hasher;
            var a2 = r3.algo;
            var o2 = [];
            (function() {
              for (var t4 = 0; t4 < 64; t4++)
                o2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
            })();
            var u2 = a2.MD5 = s2.extend({ _doReset: function() {
              this._hash = new n2.init([1732584193, 4023233417, 2562383102, 271733878]);
            }, _doProcessBlock: function(t4, e4) {
              for (var r4 = 0; r4 < 16; r4++) {
                var i3 = e4 + r4;
                var n22 = t4[i3];
                t4[i3] = 16711935 & (n22 << 8 | n22 >>> 24) | 4278255360 & (n22 << 24 | n22 >>> 8);
              }
              var s22 = this._hash.words;
              var a22 = t4[e4 + 0];
              var u22 = t4[e4 + 1];
              var d2 = t4[e4 + 2];
              var v2 = t4[e4 + 3];
              var p2 = t4[e4 + 4];
              var g2 = t4[e4 + 5];
              var y2 = t4[e4 + 6];
              var m2 = t4[e4 + 7];
              var w2 = t4[e4 + 8];
              var S2 = t4[e4 + 9];
              var _2 = t4[e4 + 10];
              var b2 = t4[e4 + 11];
              var E2 = t4[e4 + 12];
              var D2 = t4[e4 + 13];
              var M2 = t4[e4 + 14];
              var T2 = t4[e4 + 15];
              var I2 = s22[0];
              var A2 = s22[1];
              var x = s22[2];
              var R2 = s22[3];
              I2 = c2(I2, A2, x, R2, a22, 7, o2[0]);
              R2 = c2(R2, I2, A2, x, u22, 12, o2[1]);
              x = c2(x, R2, I2, A2, d2, 17, o2[2]);
              A2 = c2(A2, x, R2, I2, v2, 22, o2[3]);
              I2 = c2(I2, A2, x, R2, p2, 7, o2[4]);
              R2 = c2(R2, I2, A2, x, g2, 12, o2[5]);
              x = c2(x, R2, I2, A2, y2, 17, o2[6]);
              A2 = c2(A2, x, R2, I2, m2, 22, o2[7]);
              I2 = c2(I2, A2, x, R2, w2, 7, o2[8]);
              R2 = c2(R2, I2, A2, x, S2, 12, o2[9]);
              x = c2(x, R2, I2, A2, _2, 17, o2[10]);
              A2 = c2(A2, x, R2, I2, b2, 22, o2[11]);
              I2 = c2(I2, A2, x, R2, E2, 7, o2[12]);
              R2 = c2(R2, I2, A2, x, D2, 12, o2[13]);
              x = c2(x, R2, I2, A2, M2, 17, o2[14]);
              A2 = c2(A2, x, R2, I2, T2, 22, o2[15]);
              I2 = l2(I2, A2, x, R2, u22, 5, o2[16]);
              R2 = l2(R2, I2, A2, x, y2, 9, o2[17]);
              x = l2(x, R2, I2, A2, b2, 14, o2[18]);
              A2 = l2(A2, x, R2, I2, a22, 20, o2[19]);
              I2 = l2(I2, A2, x, R2, g2, 5, o2[20]);
              R2 = l2(R2, I2, A2, x, _2, 9, o2[21]);
              x = l2(x, R2, I2, A2, T2, 14, o2[22]);
              A2 = l2(A2, x, R2, I2, p2, 20, o2[23]);
              I2 = l2(I2, A2, x, R2, S2, 5, o2[24]);
              R2 = l2(R2, I2, A2, x, M2, 9, o2[25]);
              x = l2(x, R2, I2, A2, v2, 14, o2[26]);
              A2 = l2(A2, x, R2, I2, w2, 20, o2[27]);
              I2 = l2(I2, A2, x, R2, D2, 5, o2[28]);
              R2 = l2(R2, I2, A2, x, d2, 9, o2[29]);
              x = l2(x, R2, I2, A2, m2, 14, o2[30]);
              A2 = l2(A2, x, R2, I2, E2, 20, o2[31]);
              I2 = f2(I2, A2, x, R2, g2, 4, o2[32]);
              R2 = f2(R2, I2, A2, x, w2, 11, o2[33]);
              x = f2(x, R2, I2, A2, b2, 16, o2[34]);
              A2 = f2(A2, x, R2, I2, M2, 23, o2[35]);
              I2 = f2(I2, A2, x, R2, u22, 4, o2[36]);
              R2 = f2(R2, I2, A2, x, p2, 11, o2[37]);
              x = f2(x, R2, I2, A2, m2, 16, o2[38]);
              A2 = f2(A2, x, R2, I2, _2, 23, o2[39]);
              I2 = f2(I2, A2, x, R2, D2, 4, o2[40]);
              R2 = f2(R2, I2, A2, x, a22, 11, o2[41]);
              x = f2(x, R2, I2, A2, v2, 16, o2[42]);
              A2 = f2(A2, x, R2, I2, y2, 23, o2[43]);
              I2 = f2(I2, A2, x, R2, S2, 4, o2[44]);
              R2 = f2(R2, I2, A2, x, E2, 11, o2[45]);
              x = f2(x, R2, I2, A2, T2, 16, o2[46]);
              A2 = f2(A2, x, R2, I2, d2, 23, o2[47]);
              I2 = h2(I2, A2, x, R2, a22, 6, o2[48]);
              R2 = h2(R2, I2, A2, x, m2, 10, o2[49]);
              x = h2(x, R2, I2, A2, M2, 15, o2[50]);
              A2 = h2(A2, x, R2, I2, g2, 21, o2[51]);
              I2 = h2(I2, A2, x, R2, E2, 6, o2[52]);
              R2 = h2(R2, I2, A2, x, v2, 10, o2[53]);
              x = h2(x, R2, I2, A2, _2, 15, o2[54]);
              A2 = h2(A2, x, R2, I2, u22, 21, o2[55]);
              I2 = h2(I2, A2, x, R2, w2, 6, o2[56]);
              R2 = h2(R2, I2, A2, x, T2, 10, o2[57]);
              x = h2(x, R2, I2, A2, y2, 15, o2[58]);
              A2 = h2(A2, x, R2, I2, D2, 21, o2[59]);
              I2 = h2(I2, A2, x, R2, p2, 6, o2[60]);
              R2 = h2(R2, I2, A2, x, b2, 10, o2[61]);
              x = h2(x, R2, I2, A2, d2, 15, o2[62]);
              A2 = h2(A2, x, R2, I2, S2, 21, o2[63]);
              s22[0] = s22[0] + I2 | 0;
              s22[1] = s22[1] + A2 | 0;
              s22[2] = s22[2] + x | 0;
              s22[3] = s22[3] + R2 | 0;
            }, _doFinalize: function() {
              var t4 = this._data;
              var r4 = t4.words;
              var i3 = 8 * this._nDataBytes;
              var n22 = 8 * t4.sigBytes;
              r4[n22 >>> 5] |= 128 << 24 - n22 % 32;
              var s22 = e3.floor(i3 / 4294967296);
              var a22 = i3;
              r4[(n22 + 64 >>> 9 << 4) + 15] = 16711935 & (s22 << 8 | s22 >>> 24) | 4278255360 & (s22 << 24 | s22 >>> 8);
              r4[(n22 + 64 >>> 9 << 4) + 14] = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
              t4.sigBytes = 4 * (r4.length + 1);
              this._process();
              var o22 = this._hash;
              var u22 = o22.words;
              for (var c22 = 0; c22 < 4; c22++) {
                var l22 = u22[c22];
                u22[c22] = 16711935 & (l22 << 8 | l22 >>> 24) | 4278255360 & (l22 << 24 | l22 >>> 8);
              }
              return o22;
            }, clone: function() {
              var t4 = s2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            function c2(t4, e4, r4, i3, n22, s22, a22) {
              var o22 = t4 + (e4 & r4 | ~e4 & i3) + n22 + a22;
              return (o22 << s22 | o22 >>> 32 - s22) + e4;
            }
            function l2(t4, e4, r4, i3, n22, s22, a22) {
              var o22 = t4 + (e4 & i3 | r4 & ~i3) + n22 + a22;
              return (o22 << s22 | o22 >>> 32 - s22) + e4;
            }
            function f2(t4, e4, r4, i3, n22, s22, a22) {
              var o22 = t4 + (e4 ^ r4 ^ i3) + n22 + a22;
              return (o22 << s22 | o22 >>> 32 - s22) + e4;
            }
            function h2(t4, e4, r4, i3, n22, s22, a22) {
              var o22 = t4 + (r4 ^ (e4 | ~i3)) + n22 + a22;
              return (o22 << s22 | o22 >>> 32 - s22) + e4;
            }
            r3.MD5 = s2._createHelper(u2);
            r3.HmacMD5 = s2._createHmacHelper(u2);
          })(Math);
          return t3.MD5;
        });
      }, 8568: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.mode.CFB = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var i22 = this._cipher;
              var n2 = i22.blockSize;
              r3.call(this, t4, e4, n2, i22);
              this._prevBlock = t4.slice(e4, e4 + n2);
            } });
            e3.Decryptor = e3.extend({ processBlock: function(t4, e4) {
              var i22 = this._cipher;
              var n2 = i22.blockSize;
              var s2 = t4.slice(e4, e4 + n2);
              r3.call(this, t4, e4, n2, i22);
              this._prevBlock = s2;
            } });
            function r3(t4, e4, r4, i22) {
              var n2;
              var s2 = this._iv;
              if (s2) {
                n2 = s2.slice(0);
                this._iv = void 0;
              } else
                n2 = this._prevBlock;
              i22.encryptBlock(n2, 0);
              for (var a2 = 0; a2 < r4; a2++)
                t4[e4 + a2] ^= n2[a2];
            }
            return e3;
          }();
          return t3.mode.CFB;
        });
      }, 9968: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.mode.CTRGladman = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            function r3(t4) {
              if (255 === (t4 >> 24 & 255)) {
                var e4 = t4 >> 16 & 255;
                var r4 = t4 >> 8 & 255;
                var i3 = 255 & t4;
                if (255 === e4) {
                  e4 = 0;
                  if (255 === r4) {
                    r4 = 0;
                    if (255 === i3)
                      i3 = 0;
                    else
                      ++i3;
                  } else
                    ++r4;
                } else
                  ++e4;
                t4 = 0;
                t4 += e4 << 16;
                t4 += r4 << 8;
                t4 += i3;
              } else
                t4 += 1 << 24;
              return t4;
            }
            function i22(t4) {
              if (0 === (t4[0] = r3(t4[0])))
                t4[1] = r3(t4[1]);
              return t4;
            }
            var n2 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var r4 = this._cipher;
              var n22 = r4.blockSize;
              var s2 = this._iv;
              var a2 = this._counter;
              if (s2) {
                a2 = this._counter = s2.slice(0);
                this._iv = void 0;
              }
              i22(a2);
              var o2 = a2.slice(0);
              r4.encryptBlock(o2, 0);
              for (var u2 = 0; u2 < n22; u2++)
                t4[e4 + u2] ^= o2[u2];
            } });
            e3.Decryptor = n2;
            return e3;
          }();
          return t3.mode.CTRGladman;
        });
      }, 4242: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.mode.CTR = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            var r3 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var r4 = this._cipher;
              var i22 = r4.blockSize;
              var n2 = this._iv;
              var s2 = this._counter;
              if (n2) {
                s2 = this._counter = n2.slice(0);
                this._iv = void 0;
              }
              var a2 = s2.slice(0);
              r4.encryptBlock(a2, 0);
              s2[i22 - 1] = s2[i22 - 1] + 1 | 0;
              for (var o2 = 0; o2 < i22; o2++)
                t4[e4 + o2] ^= a2[o2];
            } });
            e3.Decryptor = r3;
            return e3;
          }();
          return t3.mode.CTR;
        });
      }, 1148: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.mode.ECB = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              this._cipher.encryptBlock(t4, e4);
            } });
            e3.Decryptor = e3.extend({ processBlock: function(t4, e4) {
              this._cipher.decryptBlock(t4, e4);
            } });
            return e3;
          }();
          return t3.mode.ECB;
        });
      }, 7660: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.mode.OFB = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            var r3 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var r4 = this._cipher;
              var i22 = r4.blockSize;
              var n2 = this._iv;
              var s2 = this._keystream;
              if (n2) {
                s2 = this._keystream = n2.slice(0);
                this._iv = void 0;
              }
              r4.encryptBlock(s2, 0);
              for (var a2 = 0; a2 < i22; a2++)
                t4[e4 + a2] ^= s2[a2];
            } });
            e3.Decryptor = r3;
            return e3;
          }();
          return t3.mode.OFB;
        });
      }, 3615: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.pad.AnsiX923 = { pad: function(t4, e3) {
            var r3 = t4.sigBytes;
            var i22 = 4 * e3;
            var n2 = i22 - r3 % i22;
            var s2 = r3 + n2 - 1;
            t4.clamp();
            t4.words[s2 >>> 2] |= n2 << 24 - s2 % 4 * 8;
            t4.sigBytes += n2;
          }, unpad: function(t4) {
            var e3 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
            t4.sigBytes -= e3;
          } };
          return t3.pad.Ansix923;
        });
      }, 2807: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.pad.Iso10126 = { pad: function(e3, r3) {
            var i22 = 4 * r3;
            var n2 = i22 - e3.sigBytes % i22;
            e3.concat(t3.lib.WordArray.random(n2 - 1)).concat(t3.lib.WordArray.create([n2 << 24], 1));
          }, unpad: function(t4) {
            var e3 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
            t4.sigBytes -= e3;
          } };
          return t3.pad.Iso10126;
        });
      }, 1077: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.pad.Iso97971 = { pad: function(e3, r3) {
            e3.concat(t3.lib.WordArray.create([2147483648], 1));
            t3.pad.ZeroPadding.pad(e3, r3);
          }, unpad: function(e3) {
            t3.pad.ZeroPadding.unpad(e3);
            e3.sigBytes--;
          } };
          return t3.pad.Iso97971;
        });
      }, 6991: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.pad.NoPadding = { pad: function() {
          }, unpad: function() {
          } };
          return t3.pad.NoPadding;
        });
      }, 6475: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(5109));
        })(this, function(t3) {
          t3.pad.ZeroPadding = { pad: function(t4, e3) {
            var r3 = 4 * e3;
            t4.clamp();
            t4.sigBytes += r3 - (t4.sigBytes % r3 || r3);
          }, unpad: function(t4) {
            var e3 = t4.words;
            var r3 = t4.sigBytes - 1;
            for (var r3 = t4.sigBytes - 1; r3 >= 0; r3--)
              if (e3[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255) {
                t4.sigBytes = r3 + 1;
                break;
              }
          } };
          return t3.pad.ZeroPadding;
        });
      }, 2112: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(2783), r22(9824));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.Base;
            var n2 = r3.WordArray;
            var s2 = e3.algo;
            var a2 = s2.SHA1;
            var o2 = s2.HMAC;
            var u2 = s2.PBKDF2 = i22.extend({ cfg: i22.extend({ keySize: 128 / 32, hasher: a2, iterations: 1 }), init: function(t4) {
              this.cfg = this.cfg.extend(t4);
            }, compute: function(t4, e4) {
              var r4 = this.cfg;
              var i3 = o2.create(r4.hasher, t4);
              var s22 = n2.create();
              var a22 = n2.create([1]);
              var u22 = s22.words;
              var c2 = a22.words;
              var l2 = r4.keySize;
              var f2 = r4.iterations;
              while (u22.length < l2) {
                var h2 = i3.update(e4).finalize(a22);
                i3.reset();
                var d2 = h2.words;
                var v2 = d2.length;
                var p2 = h2;
                for (var g2 = 1; g2 < f2; g2++) {
                  p2 = i3.finalize(p2);
                  i3.reset();
                  var y2 = p2.words;
                  for (var m2 = 0; m2 < v2; m2++)
                    d2[m2] ^= y2[m2];
                }
                s22.concat(h2);
                c2[0]++;
              }
              s22.sigBytes = 4 * l2;
              return s22;
            } });
            e3.PBKDF2 = function(t4, e4, r4) {
              return u2.create(r4).compute(t4, e4);
            };
          })();
          return t3.PBKDF2;
        });
      }, 3974: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.StreamCipher;
            var n2 = e3.algo;
            var s2 = [];
            var a2 = [];
            var o2 = [];
            var u2 = n2.RabbitLegacy = i22.extend({ _doReset: function() {
              var t4 = this._key.words;
              var e4 = this.cfg.iv;
              var r4 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
              var i3 = this._C = [t4[2] << 16 | t4[2] >>> 16, 4294901760 & t4[0] | 65535 & t4[1], t4[3] << 16 | t4[3] >>> 16, 4294901760 & t4[1] | 65535 & t4[2], t4[0] << 16 | t4[0] >>> 16, 4294901760 & t4[2] | 65535 & t4[3], t4[1] << 16 | t4[1] >>> 16, 4294901760 & t4[3] | 65535 & t4[0]];
              this._b = 0;
              for (var n22 = 0; n22 < 4; n22++)
                c2.call(this);
              for (var n22 = 0; n22 < 8; n22++)
                i3[n22] ^= r4[n22 + 4 & 7];
              if (e4) {
                var s22 = e4.words;
                var a22 = s22[0];
                var o22 = s22[1];
                var u22 = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
                var l2 = 16711935 & (o22 << 8 | o22 >>> 24) | 4278255360 & (o22 << 24 | o22 >>> 8);
                var f2 = u22 >>> 16 | 4294901760 & l2;
                var h2 = l2 << 16 | 65535 & u22;
                i3[0] ^= u22;
                i3[1] ^= f2;
                i3[2] ^= l2;
                i3[3] ^= h2;
                i3[4] ^= u22;
                i3[5] ^= f2;
                i3[6] ^= l2;
                i3[7] ^= h2;
                for (var n22 = 0; n22 < 4; n22++)
                  c2.call(this);
              }
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._X;
              c2.call(this);
              s2[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
              s2[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
              s2[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
              s2[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
              for (var i3 = 0; i3 < 4; i3++) {
                s2[i3] = 16711935 & (s2[i3] << 8 | s2[i3] >>> 24) | 4278255360 & (s2[i3] << 24 | s2[i3] >>> 8);
                t4[e4 + i3] ^= s2[i3];
              }
            }, blockSize: 128 / 32, ivSize: 64 / 32 });
            function c2() {
              var t4 = this._X;
              var e4 = this._C;
              for (var r4 = 0; r4 < 8; r4++)
                a2[r4] = e4[r4];
              e4[0] = e4[0] + 1295307597 + this._b | 0;
              e4[1] = e4[1] + 3545052371 + (e4[0] >>> 0 < a2[0] >>> 0 ? 1 : 0) | 0;
              e4[2] = e4[2] + 886263092 + (e4[1] >>> 0 < a2[1] >>> 0 ? 1 : 0) | 0;
              e4[3] = e4[3] + 1295307597 + (e4[2] >>> 0 < a2[2] >>> 0 ? 1 : 0) | 0;
              e4[4] = e4[4] + 3545052371 + (e4[3] >>> 0 < a2[3] >>> 0 ? 1 : 0) | 0;
              e4[5] = e4[5] + 886263092 + (e4[4] >>> 0 < a2[4] >>> 0 ? 1 : 0) | 0;
              e4[6] = e4[6] + 1295307597 + (e4[5] >>> 0 < a2[5] >>> 0 ? 1 : 0) | 0;
              e4[7] = e4[7] + 3545052371 + (e4[6] >>> 0 < a2[6] >>> 0 ? 1 : 0) | 0;
              this._b = e4[7] >>> 0 < a2[7] >>> 0 ? 1 : 0;
              for (var r4 = 0; r4 < 8; r4++) {
                var i3 = t4[r4] + e4[r4];
                var n22 = 65535 & i3;
                var s22 = i3 >>> 16;
                var u22 = ((n22 * n22 >>> 17) + n22 * s22 >>> 15) + s22 * s22;
                var c22 = ((4294901760 & i3) * i3 | 0) + ((65535 & i3) * i3 | 0);
                o2[r4] = u22 ^ c22;
              }
              t4[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
              t4[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
              t4[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
              t4[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
              t4[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
              t4[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
              t4[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
              t4[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
            }
            e3.RabbitLegacy = i22._createHelper(u2);
          })();
          return t3.RabbitLegacy;
        });
      }, 4454: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.StreamCipher;
            var n2 = e3.algo;
            var s2 = [];
            var a2 = [];
            var o2 = [];
            var u2 = n2.Rabbit = i22.extend({ _doReset: function() {
              var t4 = this._key.words;
              var e4 = this.cfg.iv;
              for (var r4 = 0; r4 < 4; r4++)
                t4[r4] = 16711935 & (t4[r4] << 8 | t4[r4] >>> 24) | 4278255360 & (t4[r4] << 24 | t4[r4] >>> 8);
              var i3 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
              var n22 = this._C = [t4[2] << 16 | t4[2] >>> 16, 4294901760 & t4[0] | 65535 & t4[1], t4[3] << 16 | t4[3] >>> 16, 4294901760 & t4[1] | 65535 & t4[2], t4[0] << 16 | t4[0] >>> 16, 4294901760 & t4[2] | 65535 & t4[3], t4[1] << 16 | t4[1] >>> 16, 4294901760 & t4[3] | 65535 & t4[0]];
              this._b = 0;
              for (var r4 = 0; r4 < 4; r4++)
                c2.call(this);
              for (var r4 = 0; r4 < 8; r4++)
                n22[r4] ^= i3[r4 + 4 & 7];
              if (e4) {
                var s22 = e4.words;
                var a22 = s22[0];
                var o22 = s22[1];
                var u22 = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
                var l2 = 16711935 & (o22 << 8 | o22 >>> 24) | 4278255360 & (o22 << 24 | o22 >>> 8);
                var f2 = u22 >>> 16 | 4294901760 & l2;
                var h2 = l2 << 16 | 65535 & u22;
                n22[0] ^= u22;
                n22[1] ^= f2;
                n22[2] ^= l2;
                n22[3] ^= h2;
                n22[4] ^= u22;
                n22[5] ^= f2;
                n22[6] ^= l2;
                n22[7] ^= h2;
                for (var r4 = 0; r4 < 4; r4++)
                  c2.call(this);
              }
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._X;
              c2.call(this);
              s2[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
              s2[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
              s2[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
              s2[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
              for (var i3 = 0; i3 < 4; i3++) {
                s2[i3] = 16711935 & (s2[i3] << 8 | s2[i3] >>> 24) | 4278255360 & (s2[i3] << 24 | s2[i3] >>> 8);
                t4[e4 + i3] ^= s2[i3];
              }
            }, blockSize: 128 / 32, ivSize: 64 / 32 });
            function c2() {
              var t4 = this._X;
              var e4 = this._C;
              for (var r4 = 0; r4 < 8; r4++)
                a2[r4] = e4[r4];
              e4[0] = e4[0] + 1295307597 + this._b | 0;
              e4[1] = e4[1] + 3545052371 + (e4[0] >>> 0 < a2[0] >>> 0 ? 1 : 0) | 0;
              e4[2] = e4[2] + 886263092 + (e4[1] >>> 0 < a2[1] >>> 0 ? 1 : 0) | 0;
              e4[3] = e4[3] + 1295307597 + (e4[2] >>> 0 < a2[2] >>> 0 ? 1 : 0) | 0;
              e4[4] = e4[4] + 3545052371 + (e4[3] >>> 0 < a2[3] >>> 0 ? 1 : 0) | 0;
              e4[5] = e4[5] + 886263092 + (e4[4] >>> 0 < a2[4] >>> 0 ? 1 : 0) | 0;
              e4[6] = e4[6] + 1295307597 + (e4[5] >>> 0 < a2[5] >>> 0 ? 1 : 0) | 0;
              e4[7] = e4[7] + 3545052371 + (e4[6] >>> 0 < a2[6] >>> 0 ? 1 : 0) | 0;
              this._b = e4[7] >>> 0 < a2[7] >>> 0 ? 1 : 0;
              for (var r4 = 0; r4 < 8; r4++) {
                var i3 = t4[r4] + e4[r4];
                var n22 = 65535 & i3;
                var s22 = i3 >>> 16;
                var u22 = ((n22 * n22 >>> 17) + n22 * s22 >>> 15) + s22 * s22;
                var c22 = ((4294901760 & i3) * i3 | 0) + ((65535 & i3) * i3 | 0);
                o2[r4] = u22 ^ c22;
              }
              t4[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
              t4[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
              t4[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
              t4[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
              t4[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
              t4[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
              t4[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
              t4[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
            }
            e3.Rabbit = i22._createHelper(u2);
          })();
          return t3.Rabbit;
        });
      }, 1857: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.StreamCipher;
            var n2 = e3.algo;
            var s2 = n2.RC4 = i22.extend({ _doReset: function() {
              var t4 = this._key;
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = this._S = [];
              for (var n22 = 0; n22 < 256; n22++)
                i3[n22] = n22;
              for (var n22 = 0, s22 = 0; n22 < 256; n22++) {
                var a22 = n22 % r4;
                var o22 = e4[a22 >>> 2] >>> 24 - a22 % 4 * 8 & 255;
                s22 = (s22 + i3[n22] + o22) % 256;
                var u2 = i3[n22];
                i3[n22] = i3[s22];
                i3[s22] = u2;
              }
              this._i = this._j = 0;
            }, _doProcessBlock: function(t4, e4) {
              t4[e4] ^= a2.call(this);
            }, keySize: 256 / 32, ivSize: 0 });
            function a2() {
              var t4 = this._S;
              var e4 = this._i;
              var r4 = this._j;
              var i3 = 0;
              for (var n22 = 0; n22 < 4; n22++) {
                e4 = (e4 + 1) % 256;
                r4 = (r4 + t4[e4]) % 256;
                var s22 = t4[e4];
                t4[e4] = t4[r4];
                t4[r4] = s22;
                i3 |= t4[(t4[e4] + t4[r4]) % 256] << 24 - 8 * n22;
              }
              this._i = e4;
              this._j = r4;
              return i3;
            }
            e3.RC4 = i22._createHelper(s2);
            var o2 = n2.RC4Drop = s2.extend({ cfg: s2.cfg.extend({ drop: 192 }), _doReset: function() {
              s2._doReset.call(this);
              for (var t4 = this.cfg.drop; t4 > 0; t4--)
                a2.call(this);
            } });
            e3.RC4Drop = i22._createHelper(o2);
          })();
          return t3.RC4;
        });
      }, 706: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i22 = r3.lib;
            var n2 = i22.WordArray;
            var s2 = i22.Hasher;
            var a2 = r3.algo;
            var o2 = n2.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
            var u2 = n2.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
            var c2 = n2.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
            var l2 = n2.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
            var f2 = n2.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
            var h2 = n2.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
            var d2 = a2.RIPEMD160 = s2.extend({ _doReset: function() {
              this._hash = n2.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            }, _doProcessBlock: function(t4, e4) {
              for (var r4 = 0; r4 < 16; r4++) {
                var i3 = e4 + r4;
                var n22 = t4[i3];
                t4[i3] = 16711935 & (n22 << 8 | n22 >>> 24) | 4278255360 & (n22 << 24 | n22 >>> 8);
              }
              var s22 = this._hash.words;
              var a22 = f2.words;
              var d22 = h2.words;
              var S2 = o2.words;
              var _2 = u2.words;
              var b2 = c2.words;
              var E2 = l2.words;
              var D2, M2, T2, I2, A2;
              var x, R2, B2, O2, k;
              x = D2 = s22[0];
              R2 = M2 = s22[1];
              B2 = T2 = s22[2];
              O2 = I2 = s22[3];
              k = A2 = s22[4];
              var C2;
              for (var r4 = 0; r4 < 80; r4 += 1) {
                C2 = D2 + t4[e4 + S2[r4]] | 0;
                if (r4 < 16)
                  C2 += v2(M2, T2, I2) + a22[0];
                else if (r4 < 32)
                  C2 += p2(M2, T2, I2) + a22[1];
                else if (r4 < 48)
                  C2 += g2(M2, T2, I2) + a22[2];
                else if (r4 < 64)
                  C2 += y2(M2, T2, I2) + a22[3];
                else
                  C2 += m2(M2, T2, I2) + a22[4];
                C2 |= 0;
                C2 = w2(C2, b2[r4]);
                C2 = C2 + A2 | 0;
                D2 = A2;
                A2 = I2;
                I2 = w2(T2, 10);
                T2 = M2;
                M2 = C2;
                C2 = x + t4[e4 + _2[r4]] | 0;
                if (r4 < 16)
                  C2 += m2(R2, B2, O2) + d22[0];
                else if (r4 < 32)
                  C2 += y2(R2, B2, O2) + d22[1];
                else if (r4 < 48)
                  C2 += g2(R2, B2, O2) + d22[2];
                else if (r4 < 64)
                  C2 += p2(R2, B2, O2) + d22[3];
                else
                  C2 += v2(R2, B2, O2) + d22[4];
                C2 |= 0;
                C2 = w2(C2, E2[r4]);
                C2 = C2 + k | 0;
                x = k;
                k = O2;
                O2 = w2(B2, 10);
                B2 = R2;
                R2 = C2;
              }
              C2 = s22[1] + T2 + O2 | 0;
              s22[1] = s22[2] + I2 + k | 0;
              s22[2] = s22[3] + A2 + x | 0;
              s22[3] = s22[4] + D2 + R2 | 0;
              s22[4] = s22[0] + M2 + B2 | 0;
              s22[0] = C2;
            }, _doFinalize: function() {
              var t4 = this._data;
              var e4 = t4.words;
              var r4 = 8 * this._nDataBytes;
              var i3 = 8 * t4.sigBytes;
              e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
              e4[(i3 + 64 >>> 9 << 4) + 14] = 16711935 & (r4 << 8 | r4 >>> 24) | 4278255360 & (r4 << 24 | r4 >>> 8);
              t4.sigBytes = 4 * (e4.length + 1);
              this._process();
              var n22 = this._hash;
              var s22 = n22.words;
              for (var a22 = 0; a22 < 5; a22++) {
                var o22 = s22[a22];
                s22[a22] = 16711935 & (o22 << 8 | o22 >>> 24) | 4278255360 & (o22 << 24 | o22 >>> 8);
              }
              return n22;
            }, clone: function() {
              var t4 = s2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            function v2(t4, e4, r4) {
              return t4 ^ e4 ^ r4;
            }
            function p2(t4, e4, r4) {
              return t4 & e4 | ~t4 & r4;
            }
            function g2(t4, e4, r4) {
              return (t4 | ~e4) ^ r4;
            }
            function y2(t4, e4, r4) {
              return t4 & r4 | e4 & ~r4;
            }
            function m2(t4, e4, r4) {
              return t4 ^ (e4 | ~r4);
            }
            function w2(t4, e4) {
              return t4 << e4 | t4 >>> 32 - e4;
            }
            r3.RIPEMD160 = s2._createHelper(d2);
            r3.HmacRIPEMD160 = s2._createHmacHelper(d2);
          })();
          return t3.RIPEMD160;
        });
      }, 2783: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.WordArray;
            var n2 = r3.Hasher;
            var s2 = e3.algo;
            var a2 = [];
            var o2 = s2.SHA1 = n2.extend({ _doReset: function() {
              this._hash = new i22.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._hash.words;
              var i3 = r4[0];
              var n22 = r4[1];
              var s22 = r4[2];
              var o22 = r4[3];
              var u2 = r4[4];
              for (var c2 = 0; c2 < 80; c2++) {
                if (c2 < 16)
                  a2[c2] = 0 | t4[e4 + c2];
                else {
                  var l2 = a2[c2 - 3] ^ a2[c2 - 8] ^ a2[c2 - 14] ^ a2[c2 - 16];
                  a2[c2] = l2 << 1 | l2 >>> 31;
                }
                var f2 = (i3 << 5 | i3 >>> 27) + u2 + a2[c2];
                if (c2 < 20)
                  f2 += (n22 & s22 | ~n22 & o22) + 1518500249;
                else if (c2 < 40)
                  f2 += (n22 ^ s22 ^ o22) + 1859775393;
                else if (c2 < 60)
                  f2 += (n22 & s22 | n22 & o22 | s22 & o22) - 1894007588;
                else
                  f2 += (n22 ^ s22 ^ o22) - 899497514;
                u2 = o22;
                o22 = s22;
                s22 = n22 << 30 | n22 >>> 2;
                n22 = i3;
                i3 = f2;
              }
              r4[0] = r4[0] + i3 | 0;
              r4[1] = r4[1] + n22 | 0;
              r4[2] = r4[2] + s22 | 0;
              r4[3] = r4[3] + o22 | 0;
              r4[4] = r4[4] + u2 | 0;
            }, _doFinalize: function() {
              var t4 = this._data;
              var e4 = t4.words;
              var r4 = 8 * this._nDataBytes;
              var i3 = 8 * t4.sigBytes;
              e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
              e4[(i3 + 64 >>> 9 << 4) + 14] = Math.floor(r4 / 4294967296);
              e4[(i3 + 64 >>> 9 << 4) + 15] = r4;
              t4.sigBytes = 4 * e4.length;
              this._process();
              return this._hash;
            }, clone: function() {
              var t4 = n2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            e3.SHA1 = n2._createHelper(o2);
            e3.HmacSHA1 = n2._createHmacHelper(o2);
          })();
          return t3.SHA1;
        });
      }, 7792: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(2153));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.WordArray;
            var n2 = e3.algo;
            var s2 = n2.SHA256;
            var a2 = n2.SHA224 = s2.extend({ _doReset: function() {
              this._hash = new i22.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
            }, _doFinalize: function() {
              var t4 = s2._doFinalize.call(this);
              t4.sigBytes -= 4;
              return t4;
            } });
            e3.SHA224 = s2._createHelper(a2);
            e3.HmacSHA224 = s2._createHmacHelper(a2);
          })();
          return t3.SHA224;
        });
      }, 2153: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i22 = r3.lib;
            var n2 = i22.WordArray;
            var s2 = i22.Hasher;
            var a2 = r3.algo;
            var o2 = [];
            var u2 = [];
            (function() {
              function t4(t5) {
                var r5 = e3.sqrt(t5);
                for (var i4 = 2; i4 <= r5; i4++)
                  if (!(t5 % i4))
                    return false;
                return true;
              }
              function r4(t5) {
                return 4294967296 * (t5 - (0 | t5)) | 0;
              }
              var i3 = 2;
              var n22 = 0;
              while (n22 < 64) {
                if (t4(i3)) {
                  if (n22 < 8)
                    o2[n22] = r4(e3.pow(i3, 1 / 2));
                  u2[n22] = r4(e3.pow(i3, 1 / 3));
                  n22++;
                }
                i3++;
              }
            })();
            var c2 = [];
            var l2 = a2.SHA256 = s2.extend({ _doReset: function() {
              this._hash = new n2.init(o2.slice(0));
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._hash.words;
              var i3 = r4[0];
              var n22 = r4[1];
              var s22 = r4[2];
              var a22 = r4[3];
              var o22 = r4[4];
              var l22 = r4[5];
              var f2 = r4[6];
              var h2 = r4[7];
              for (var d2 = 0; d2 < 64; d2++) {
                if (d2 < 16)
                  c2[d2] = 0 | t4[e4 + d2];
                else {
                  var v2 = c2[d2 - 15];
                  var p2 = (v2 << 25 | v2 >>> 7) ^ (v2 << 14 | v2 >>> 18) ^ v2 >>> 3;
                  var g2 = c2[d2 - 2];
                  var y2 = (g2 << 15 | g2 >>> 17) ^ (g2 << 13 | g2 >>> 19) ^ g2 >>> 10;
                  c2[d2] = p2 + c2[d2 - 7] + y2 + c2[d2 - 16];
                }
                var m2 = o22 & l22 ^ ~o22 & f2;
                var w2 = i3 & n22 ^ i3 & s22 ^ n22 & s22;
                var S2 = (i3 << 30 | i3 >>> 2) ^ (i3 << 19 | i3 >>> 13) ^ (i3 << 10 | i3 >>> 22);
                var _2 = (o22 << 26 | o22 >>> 6) ^ (o22 << 21 | o22 >>> 11) ^ (o22 << 7 | o22 >>> 25);
                var b2 = h2 + _2 + m2 + u2[d2] + c2[d2];
                var E2 = S2 + w2;
                h2 = f2;
                f2 = l22;
                l22 = o22;
                o22 = a22 + b2 | 0;
                a22 = s22;
                s22 = n22;
                n22 = i3;
                i3 = b2 + E2 | 0;
              }
              r4[0] = r4[0] + i3 | 0;
              r4[1] = r4[1] + n22 | 0;
              r4[2] = r4[2] + s22 | 0;
              r4[3] = r4[3] + a22 | 0;
              r4[4] = r4[4] + o22 | 0;
              r4[5] = r4[5] + l22 | 0;
              r4[6] = r4[6] + f2 | 0;
              r4[7] = r4[7] + h2 | 0;
            }, _doFinalize: function() {
              var t4 = this._data;
              var r4 = t4.words;
              var i3 = 8 * this._nDataBytes;
              var n22 = 8 * t4.sigBytes;
              r4[n22 >>> 5] |= 128 << 24 - n22 % 32;
              r4[(n22 + 64 >>> 9 << 4) + 14] = e3.floor(i3 / 4294967296);
              r4[(n22 + 64 >>> 9 << 4) + 15] = i3;
              t4.sigBytes = 4 * r4.length;
              this._process();
              return this._hash;
            }, clone: function() {
              var t4 = s2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            r3.SHA256 = s2._createHelper(l2);
            r3.HmacSHA256 = s2._createHmacHelper(l2);
          })(Math);
          return t3.SHA256;
        });
      }, 3327: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(4938));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i22 = r3.lib;
            var n2 = i22.WordArray;
            var s2 = i22.Hasher;
            var a2 = r3.x64;
            var o2 = a2.Word;
            var u2 = r3.algo;
            var c2 = [];
            var l2 = [];
            var f2 = [];
            (function() {
              var t4 = 1, e4 = 0;
              for (var r4 = 0; r4 < 24; r4++) {
                c2[t4 + 5 * e4] = (r4 + 1) * (r4 + 2) / 2 % 64;
                var i3 = e4 % 5;
                var n22 = (2 * t4 + 3 * e4) % 5;
                t4 = i3;
                e4 = n22;
              }
              for (var t4 = 0; t4 < 5; t4++)
                for (var e4 = 0; e4 < 5; e4++)
                  l2[t4 + 5 * e4] = e4 + (2 * t4 + 3 * e4) % 5 * 5;
              var s22 = 1;
              for (var a22 = 0; a22 < 24; a22++) {
                var u22 = 0;
                var h22 = 0;
                for (var d22 = 0; d22 < 7; d22++) {
                  if (1 & s22) {
                    var v2 = (1 << d22) - 1;
                    if (v2 < 32)
                      h22 ^= 1 << v2;
                    else
                      u22 ^= 1 << v2 - 32;
                  }
                  if (128 & s22)
                    s22 = s22 << 1 ^ 113;
                  else
                    s22 <<= 1;
                }
                f2[a22] = o2.create(u22, h22);
              }
            })();
            var h2 = [];
            (function() {
              for (var t4 = 0; t4 < 25; t4++)
                h2[t4] = o2.create();
            })();
            var d2 = u2.SHA3 = s2.extend({ cfg: s2.cfg.extend({ outputLength: 512 }), _doReset: function() {
              var t4 = this._state = [];
              for (var e4 = 0; e4 < 25; e4++)
                t4[e4] = new o2.init();
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._state;
              var i3 = this.blockSize / 2;
              for (var n22 = 0; n22 < i3; n22++) {
                var s22 = t4[e4 + 2 * n22];
                var a22 = t4[e4 + 2 * n22 + 1];
                s22 = 16711935 & (s22 << 8 | s22 >>> 24) | 4278255360 & (s22 << 24 | s22 >>> 8);
                a22 = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
                var o22 = r4[n22];
                o22.high ^= a22;
                o22.low ^= s22;
              }
              for (var u22 = 0; u22 < 24; u22++) {
                for (var d22 = 0; d22 < 5; d22++) {
                  var v2 = 0, p2 = 0;
                  for (var g2 = 0; g2 < 5; g2++) {
                    var o22 = r4[d22 + 5 * g2];
                    v2 ^= o22.high;
                    p2 ^= o22.low;
                  }
                  var y2 = h2[d22];
                  y2.high = v2;
                  y2.low = p2;
                }
                for (var d22 = 0; d22 < 5; d22++) {
                  var m2 = h2[(d22 + 4) % 5];
                  var w2 = h2[(d22 + 1) % 5];
                  var S2 = w2.high;
                  var _2 = w2.low;
                  var v2 = m2.high ^ (S2 << 1 | _2 >>> 31);
                  var p2 = m2.low ^ (_2 << 1 | S2 >>> 31);
                  for (var g2 = 0; g2 < 5; g2++) {
                    var o22 = r4[d22 + 5 * g2];
                    o22.high ^= v2;
                    o22.low ^= p2;
                  }
                }
                for (var b2 = 1; b2 < 25; b2++) {
                  var v2;
                  var p2;
                  var o22 = r4[b2];
                  var E2 = o22.high;
                  var D2 = o22.low;
                  var M2 = c2[b2];
                  if (M2 < 32) {
                    v2 = E2 << M2 | D2 >>> 32 - M2;
                    p2 = D2 << M2 | E2 >>> 32 - M2;
                  } else {
                    v2 = D2 << M2 - 32 | E2 >>> 64 - M2;
                    p2 = E2 << M2 - 32 | D2 >>> 64 - M2;
                  }
                  var T2 = h2[l2[b2]];
                  T2.high = v2;
                  T2.low = p2;
                }
                var I2 = h2[0];
                var A2 = r4[0];
                I2.high = A2.high;
                I2.low = A2.low;
                for (var d22 = 0; d22 < 5; d22++)
                  for (var g2 = 0; g2 < 5; g2++) {
                    var b2 = d22 + 5 * g2;
                    var o22 = r4[b2];
                    var x = h2[b2];
                    var R2 = h2[(d22 + 1) % 5 + 5 * g2];
                    var B2 = h2[(d22 + 2) % 5 + 5 * g2];
                    o22.high = x.high ^ ~R2.high & B2.high;
                    o22.low = x.low ^ ~R2.low & B2.low;
                  }
                var o22 = r4[0];
                var O2 = f2[u22];
                o22.high ^= O2.high;
                o22.low ^= O2.low;
              }
            }, _doFinalize: function() {
              var t4 = this._data;
              var r4 = t4.words;
              8 * this._nDataBytes;
              var s22 = 8 * t4.sigBytes;
              var a22 = 32 * this.blockSize;
              r4[s22 >>> 5] |= 1 << 24 - s22 % 32;
              r4[(e3.ceil((s22 + 1) / a22) * a22 >>> 5) - 1] |= 128;
              t4.sigBytes = 4 * r4.length;
              this._process();
              var o22 = this._state;
              var u22 = this.cfg.outputLength / 8;
              var c22 = u22 / 8;
              var l22 = [];
              for (var f22 = 0; f22 < c22; f22++) {
                var h22 = o22[f22];
                var d22 = h22.high;
                var v2 = h22.low;
                d22 = 16711935 & (d22 << 8 | d22 >>> 24) | 4278255360 & (d22 << 24 | d22 >>> 8);
                v2 = 16711935 & (v2 << 8 | v2 >>> 24) | 4278255360 & (v2 << 24 | v2 >>> 8);
                l22.push(v2);
                l22.push(d22);
              }
              return new n2.init(l22, u22);
            }, clone: function() {
              var t4 = s2.clone.call(this);
              var e4 = t4._state = this._state.slice(0);
              for (var r4 = 0; r4 < 25; r4++)
                e4[r4] = e4[r4].clone();
              return t4;
            } });
            r3.SHA3 = s2._createHelper(d2);
            r3.HmacSHA3 = s2._createHmacHelper(d2);
          })(Math);
          return t3.SHA3;
        });
      }, 7460: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(4938), r22(34));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.x64;
            var i22 = r3.Word;
            var n2 = r3.WordArray;
            var s2 = e3.algo;
            var a2 = s2.SHA512;
            var o2 = s2.SHA384 = a2.extend({ _doReset: function() {
              this._hash = new n2.init([new i22.init(3418070365, 3238371032), new i22.init(1654270250, 914150663), new i22.init(2438529370, 812702999), new i22.init(355462360, 4144912697), new i22.init(1731405415, 4290775857), new i22.init(2394180231, 1750603025), new i22.init(3675008525, 1694076839), new i22.init(1203062813, 3204075428)]);
            }, _doFinalize: function() {
              var t4 = a2._doFinalize.call(this);
              t4.sigBytes -= 16;
              return t4;
            } });
            e3.SHA384 = a2._createHelper(o2);
            e3.HmacSHA384 = a2._createHmacHelper(o2);
          })();
          return t3.SHA384;
        });
      }, 34: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(4938));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.Hasher;
            var n2 = e3.x64;
            var s2 = n2.Word;
            var a2 = n2.WordArray;
            var o2 = e3.algo;
            function u2() {
              return s2.create.apply(s2, arguments);
            }
            var c2 = [u2(1116352408, 3609767458), u2(1899447441, 602891725), u2(3049323471, 3964484399), u2(3921009573, 2173295548), u2(961987163, 4081628472), u2(1508970993, 3053834265), u2(2453635748, 2937671579), u2(2870763221, 3664609560), u2(3624381080, 2734883394), u2(310598401, 1164996542), u2(607225278, 1323610764), u2(1426881987, 3590304994), u2(1925078388, 4068182383), u2(2162078206, 991336113), u2(2614888103, 633803317), u2(3248222580, 3479774868), u2(3835390401, 2666613458), u2(4022224774, 944711139), u2(264347078, 2341262773), u2(604807628, 2007800933), u2(770255983, 1495990901), u2(1249150122, 1856431235), u2(1555081692, 3175218132), u2(1996064986, 2198950837), u2(2554220882, 3999719339), u2(2821834349, 766784016), u2(2952996808, 2566594879), u2(3210313671, 3203337956), u2(3336571891, 1034457026), u2(3584528711, 2466948901), u2(113926993, 3758326383), u2(338241895, 168717936), u2(666307205, 1188179964), u2(773529912, 1546045734), u2(1294757372, 1522805485), u2(1396182291, 2643833823), u2(1695183700, 2343527390), u2(1986661051, 1014477480), u2(2177026350, 1206759142), u2(2456956037, 344077627), u2(2730485921, 1290863460), u2(2820302411, 3158454273), u2(3259730800, 3505952657), u2(3345764771, 106217008), u2(3516065817, 3606008344), u2(3600352804, 1432725776), u2(4094571909, 1467031594), u2(275423344, 851169720), u2(430227734, 3100823752), u2(506948616, 1363258195), u2(659060556, 3750685593), u2(883997877, 3785050280), u2(958139571, 3318307427), u2(1322822218, 3812723403), u2(1537002063, 2003034995), u2(1747873779, 3602036899), u2(1955562222, 1575990012), u2(2024104815, 1125592928), u2(2227730452, 2716904306), u2(2361852424, 442776044), u2(2428436474, 593698344), u2(2756734187, 3733110249), u2(3204031479, 2999351573), u2(3329325298, 3815920427), u2(3391569614, 3928383900), u2(3515267271, 566280711), u2(3940187606, 3454069534), u2(4118630271, 4000239992), u2(116418474, 1914138554), u2(174292421, 2731055270), u2(289380356, 3203993006), u2(460393269, 320620315), u2(685471733, 587496836), u2(852142971, 1086792851), u2(1017036298, 365543100), u2(1126000580, 2618297676), u2(1288033470, 3409855158), u2(1501505948, 4234509866), u2(1607167915, 987167468), u2(1816402316, 1246189591)];
            var l2 = [];
            (function() {
              for (var t4 = 0; t4 < 80; t4++)
                l2[t4] = u2();
            })();
            var f2 = o2.SHA512 = i22.extend({ _doReset: function() {
              this._hash = new a2.init([new s2.init(1779033703, 4089235720), new s2.init(3144134277, 2227873595), new s2.init(1013904242, 4271175723), new s2.init(2773480762, 1595750129), new s2.init(1359893119, 2917565137), new s2.init(2600822924, 725511199), new s2.init(528734635, 4215389547), new s2.init(1541459225, 327033209)]);
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._hash.words;
              var i3 = r4[0];
              var n22 = r4[1];
              var s22 = r4[2];
              var a22 = r4[3];
              var o22 = r4[4];
              var u22 = r4[5];
              var f22 = r4[6];
              var h2 = r4[7];
              var d2 = i3.high;
              var v2 = i3.low;
              var p2 = n22.high;
              var g2 = n22.low;
              var y2 = s22.high;
              var m2 = s22.low;
              var w2 = a22.high;
              var S2 = a22.low;
              var _2 = o22.high;
              var b2 = o22.low;
              var E2 = u22.high;
              var D2 = u22.low;
              var M2 = f22.high;
              var T2 = f22.low;
              var I2 = h2.high;
              var A2 = h2.low;
              var x = d2;
              var R2 = v2;
              var B2 = p2;
              var O2 = g2;
              var k = y2;
              var C2 = m2;
              var N2 = w2;
              var P2 = S2;
              var V2 = _2;
              var L2 = b2;
              var H2 = E2;
              var U2 = D2;
              var K2 = M2;
              var j2 = T2;
              var q2 = I2;
              var F2 = A2;
              for (var z2 = 0; z2 < 80; z2++) {
                var G2;
                var Y2;
                var W2 = l2[z2];
                if (z2 < 16) {
                  Y2 = W2.high = 0 | t4[e4 + 2 * z2];
                  G2 = W2.low = 0 | t4[e4 + 2 * z2 + 1];
                } else {
                  var J2 = l2[z2 - 15];
                  var Z2 = J2.high;
                  var $2 = J2.low;
                  var X2 = (Z2 >>> 1 | $2 << 31) ^ (Z2 >>> 8 | $2 << 24) ^ Z2 >>> 7;
                  var Q2 = ($2 >>> 1 | Z2 << 31) ^ ($2 >>> 8 | Z2 << 24) ^ ($2 >>> 7 | Z2 << 25);
                  var tt2 = l2[z2 - 2];
                  var et2 = tt2.high;
                  var rt2 = tt2.low;
                  var it2 = (et2 >>> 19 | rt2 << 13) ^ (et2 << 3 | rt2 >>> 29) ^ et2 >>> 6;
                  var nt2 = (rt2 >>> 19 | et2 << 13) ^ (rt2 << 3 | et2 >>> 29) ^ (rt2 >>> 6 | et2 << 26);
                  var st2 = l2[z2 - 7];
                  var at2 = st2.high;
                  var ot2 = st2.low;
                  var ut2 = l2[z2 - 16];
                  var ct2 = ut2.high;
                  var lt2 = ut2.low;
                  G2 = Q2 + ot2;
                  Y2 = X2 + at2 + (G2 >>> 0 < Q2 >>> 0 ? 1 : 0);
                  G2 += nt2;
                  Y2 = Y2 + it2 + (G2 >>> 0 < nt2 >>> 0 ? 1 : 0);
                  G2 += lt2;
                  Y2 = Y2 + ct2 + (G2 >>> 0 < lt2 >>> 0 ? 1 : 0);
                  W2.high = Y2;
                  W2.low = G2;
                }
                var ft2 = V2 & H2 ^ ~V2 & K2;
                var ht2 = L2 & U2 ^ ~L2 & j2;
                var dt2 = x & B2 ^ x & k ^ B2 & k;
                var vt2 = R2 & O2 ^ R2 & C2 ^ O2 & C2;
                var pt2 = (x >>> 28 | R2 << 4) ^ (x << 30 | R2 >>> 2) ^ (x << 25 | R2 >>> 7);
                var gt2 = (R2 >>> 28 | x << 4) ^ (R2 << 30 | x >>> 2) ^ (R2 << 25 | x >>> 7);
                var yt2 = (V2 >>> 14 | L2 << 18) ^ (V2 >>> 18 | L2 << 14) ^ (V2 << 23 | L2 >>> 9);
                var mt2 = (L2 >>> 14 | V2 << 18) ^ (L2 >>> 18 | V2 << 14) ^ (L2 << 23 | V2 >>> 9);
                var wt2 = c2[z2];
                var St2 = wt2.high;
                var _t2 = wt2.low;
                var bt2 = F2 + mt2;
                var Et2 = q2 + yt2 + (bt2 >>> 0 < F2 >>> 0 ? 1 : 0);
                var bt2 = bt2 + ht2;
                var Et2 = Et2 + ft2 + (bt2 >>> 0 < ht2 >>> 0 ? 1 : 0);
                var bt2 = bt2 + _t2;
                var Et2 = Et2 + St2 + (bt2 >>> 0 < _t2 >>> 0 ? 1 : 0);
                var bt2 = bt2 + G2;
                var Et2 = Et2 + Y2 + (bt2 >>> 0 < G2 >>> 0 ? 1 : 0);
                var Dt2 = gt2 + vt2;
                var Mt2 = pt2 + dt2 + (Dt2 >>> 0 < gt2 >>> 0 ? 1 : 0);
                q2 = K2;
                F2 = j2;
                K2 = H2;
                j2 = U2;
                H2 = V2;
                U2 = L2;
                L2 = P2 + bt2 | 0;
                V2 = N2 + Et2 + (L2 >>> 0 < P2 >>> 0 ? 1 : 0) | 0;
                N2 = k;
                P2 = C2;
                k = B2;
                C2 = O2;
                B2 = x;
                O2 = R2;
                R2 = bt2 + Dt2 | 0;
                x = Et2 + Mt2 + (R2 >>> 0 < bt2 >>> 0 ? 1 : 0) | 0;
              }
              v2 = i3.low = v2 + R2;
              i3.high = d2 + x + (v2 >>> 0 < R2 >>> 0 ? 1 : 0);
              g2 = n22.low = g2 + O2;
              n22.high = p2 + B2 + (g2 >>> 0 < O2 >>> 0 ? 1 : 0);
              m2 = s22.low = m2 + C2;
              s22.high = y2 + k + (m2 >>> 0 < C2 >>> 0 ? 1 : 0);
              S2 = a22.low = S2 + P2;
              a22.high = w2 + N2 + (S2 >>> 0 < P2 >>> 0 ? 1 : 0);
              b2 = o22.low = b2 + L2;
              o22.high = _2 + V2 + (b2 >>> 0 < L2 >>> 0 ? 1 : 0);
              D2 = u22.low = D2 + U2;
              u22.high = E2 + H2 + (D2 >>> 0 < U2 >>> 0 ? 1 : 0);
              T2 = f22.low = T2 + j2;
              f22.high = M2 + K2 + (T2 >>> 0 < j2 >>> 0 ? 1 : 0);
              A2 = h2.low = A2 + F2;
              h2.high = I2 + q2 + (A2 >>> 0 < F2 >>> 0 ? 1 : 0);
            }, _doFinalize: function() {
              var t4 = this._data;
              var e4 = t4.words;
              var r4 = 8 * this._nDataBytes;
              var i3 = 8 * t4.sigBytes;
              e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
              e4[(i3 + 128 >>> 10 << 5) + 30] = Math.floor(r4 / 4294967296);
              e4[(i3 + 128 >>> 10 << 5) + 31] = r4;
              t4.sigBytes = 4 * e4.length;
              this._process();
              var n22 = this._hash.toX32();
              return n22;
            }, clone: function() {
              var t4 = i22.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            }, blockSize: 1024 / 32 });
            e3.SHA512 = i22._createHelper(f2);
            e3.HmacSHA512 = i22._createHmacHelper(f2);
          })();
          return t3.SHA512;
        });
      }, 4253: function(t22, e22, r22) {
        (function(i22, n2, s2) {
          t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i22 = r3.WordArray;
            var n2 = r3.BlockCipher;
            var s2 = e3.algo;
            var a2 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
            var o2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
            var u2 = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
            var c2 = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }];
            var l2 = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
            var f2 = s2.DES = n2.extend({ _doReset: function() {
              var t4 = this._key;
              var e4 = t4.words;
              var r4 = [];
              for (var i3 = 0; i3 < 56; i3++) {
                var n22 = a2[i3] - 1;
                r4[i3] = e4[n22 >>> 5] >>> 31 - n22 % 32 & 1;
              }
              var s22 = this._subKeys = [];
              for (var c22 = 0; c22 < 16; c22++) {
                var l22 = s22[c22] = [];
                var f22 = u2[c22];
                for (var i3 = 0; i3 < 24; i3++) {
                  l22[i3 / 6 | 0] |= r4[(o2[i3] - 1 + f22) % 28] << 31 - i3 % 6;
                  l22[4 + (i3 / 6 | 0)] |= r4[28 + (o2[i3 + 24] - 1 + f22) % 28] << 31 - i3 % 6;
                }
                l22[0] = l22[0] << 1 | l22[0] >>> 31;
                for (var i3 = 1; i3 < 7; i3++)
                  l22[i3] = l22[i3] >>> 4 * (i3 - 1) + 3;
                l22[7] = l22[7] << 5 | l22[7] >>> 27;
              }
              var h22 = this._invSubKeys = [];
              for (var i3 = 0; i3 < 16; i3++)
                h22[i3] = s22[15 - i3];
            }, encryptBlock: function(t4, e4) {
              this._doCryptBlock(t4, e4, this._subKeys);
            }, decryptBlock: function(t4, e4) {
              this._doCryptBlock(t4, e4, this._invSubKeys);
            }, _doCryptBlock: function(t4, e4, r4) {
              this._lBlock = t4[e4];
              this._rBlock = t4[e4 + 1];
              h2.call(this, 4, 252645135);
              h2.call(this, 16, 65535);
              d2.call(this, 2, 858993459);
              d2.call(this, 8, 16711935);
              h2.call(this, 1, 1431655765);
              for (var i3 = 0; i3 < 16; i3++) {
                var n22 = r4[i3];
                var s22 = this._lBlock;
                var a22 = this._rBlock;
                var o22 = 0;
                for (var u22 = 0; u22 < 8; u22++)
                  o22 |= c2[u22][((a22 ^ n22[u22]) & l2[u22]) >>> 0];
                this._lBlock = a22;
                this._rBlock = s22 ^ o22;
              }
              var f22 = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = f22;
              h2.call(this, 1, 1431655765);
              d2.call(this, 8, 16711935);
              d2.call(this, 2, 858993459);
              h2.call(this, 16, 65535);
              h2.call(this, 4, 252645135);
              t4[e4] = this._lBlock;
              t4[e4 + 1] = this._rBlock;
            }, keySize: 64 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
            function h2(t4, e4) {
              var r4 = (this._lBlock >>> t4 ^ this._rBlock) & e4;
              this._rBlock ^= r4;
              this._lBlock ^= r4 << t4;
            }
            function d2(t4, e4) {
              var r4 = (this._rBlock >>> t4 ^ this._lBlock) & e4;
              this._lBlock ^= r4;
              this._rBlock ^= r4 << t4;
            }
            e3.DES = n2._createHelper(f2);
            var v2 = s2.TripleDES = n2.extend({ _doReset: function() {
              var t4 = this._key;
              var e4 = t4.words;
              if (2 !== e4.length && 4 !== e4.length && e4.length < 6)
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              var r4 = e4.slice(0, 2);
              var n22 = e4.length < 4 ? e4.slice(0, 2) : e4.slice(2, 4);
              var s22 = e4.length < 6 ? e4.slice(0, 2) : e4.slice(4, 6);
              this._des1 = f2.createEncryptor(i22.create(r4));
              this._des2 = f2.createEncryptor(i22.create(n22));
              this._des3 = f2.createEncryptor(i22.create(s22));
            }, encryptBlock: function(t4, e4) {
              this._des1.encryptBlock(t4, e4);
              this._des2.decryptBlock(t4, e4);
              this._des3.encryptBlock(t4, e4);
            }, decryptBlock: function(t4, e4) {
              this._des3.decryptBlock(t4, e4);
              this._des2.encryptBlock(t4, e4);
              this._des1.decryptBlock(t4, e4);
            }, keySize: 192 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
            e3.TripleDES = n2._createHelper(v2);
          })();
          return t3.TripleDES;
        });
      }, 4938: function(t22, e22, r22) {
        (function(i22, n2) {
          t22.exports = n2(r22(8249));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i22 = r3.lib;
            var n2 = i22.Base;
            var s2 = i22.WordArray;
            var a2 = r3.x64 = {};
            a2.Word = n2.extend({ init: function(t4, e4) {
              this.high = t4;
              this.low = e4;
            } });
            a2.WordArray = n2.extend({ init: function(t4, r4) {
              t4 = this.words = t4 || [];
              if (r4 != e3)
                this.sigBytes = r4;
              else
                this.sigBytes = 8 * t4.length;
            }, toX32: function() {
              var t4 = this.words;
              var e4 = t4.length;
              var r4 = [];
              for (var i3 = 0; i3 < e4; i3++) {
                var n22 = t4[i3];
                r4.push(n22.high);
                r4.push(n22.low);
              }
              return s2.create(r4, this.sigBytes);
            }, clone: function() {
              var t4 = n2.clone.call(this);
              var e4 = t4.words = this.words.slice(0);
              var r4 = e4.length;
              for (var i3 = 0; i3 < r4; i3++)
                e4[i3] = e4[i3].clone();
              return t4;
            } });
          })();
          return t3;
        });
      }, 4198: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        e22.ErrorCode = void 0;
        (function(t3) {
          t3[t3["SUCCESS"] = 0] = "SUCCESS";
          t3[t3["CLIENT_ID_NOT_FOUND"] = 1] = "CLIENT_ID_NOT_FOUND";
          t3[t3["OPERATION_TOO_OFTEN"] = 2] = "OPERATION_TOO_OFTEN";
          t3[t3["REPEAT_MESSAGE"] = 3] = "REPEAT_MESSAGE";
          t3[t3["TIME_OUT"] = 4] = "TIME_OUT";
        })(e22.ErrorCode || (e22.ErrorCode = {}));
      }, 9021: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        const n2 = i22(r22(6893));
        const s2 = i22(r22(7555));
        const a2 = i22(r22(6379));
        const o2 = i22(r22(529));
        var u2;
        (function(t3) {
          function e3(t4) {
            o2.default.debugMode = t4;
            o2.default.info(`setDebugMode: ${t4}`);
          }
          t3.setDebugMode = e3;
          function r3(t4) {
            try {
              s2.default.init(t4);
            } catch (t5) {
              o2.default.error(`init error`, t5);
            }
          }
          t3.init = r3;
          function i3(t4) {
            try {
              if (!t4.url)
                throw new Error("invalid url");
              if (!t4.key || !t4.keyId)
                throw new Error("invalid key or keyId");
              a2.default.socketUrl = t4.url;
              a2.default.publicKeyId = t4.keyId;
              a2.default.publicKey = t4.key;
            } catch (t5) {
              o2.default.error(`setSocketServer error`, t5);
            }
          }
          t3.setSocketServer = i3;
          function u22(t4) {
            try {
              s2.default.enableSocket(t4);
            } catch (t5) {
              o2.default.error(`enableSocket error`, t5);
            }
          }
          t3.enableSocket = u22;
          function c2() {
            return n2.default.SDK_VERSION;
          }
          t3.getVersion = c2;
        })(u2 || (u2 = {}));
        t22.exports = u2;
      }, 9478: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(529));
        const s2 = i22(r22(496));
        const a2 = i22(r22(3555));
        const o2 = i22(r22(1929));
        const u2 = i22(r22(4379));
        const c2 = i22(r22(6899));
        const l2 = i22(r22(776));
        const f2 = i22(r22(2002));
        const h2 = i22(r22(5807));
        const d2 = i22(r22(9704));
        const v2 = i22(r22(6545));
        const p2 = i22(r22(3680));
        const g2 = i22(r22(7706));
        const y2 = i22(r22(4486));
        const m2 = i22(r22(5867));
        const w2 = i22(r22(7006));
        var S2;
        (function(t3) {
          let e3;
          let r3;
          let i3;
          function S22() {
            let t4;
            try {
              if ("undefined" != typeof uni) {
                e3 = new v2.default();
                r3 = new p2.default();
                i3 = new g2.default();
              } else if ("undefined" != typeof tt) {
                e3 = new f2.default();
                r3 = new h2.default();
                i3 = new d2.default();
              } else if ("undefined" != typeof my) {
                e3 = new s2.default();
                r3 = new a2.default();
                i3 = new o2.default();
              } else if ("undefined" != typeof wx) {
                e3 = new y2.default();
                r3 = new m2.default();
                i3 = new w2.default();
              } else if ("undefined" != typeof window) {
                e3 = new u2.default();
                r3 = new c2.default();
                i3 = new l2.default();
              }
            } catch (e4) {
              n2.default.error(`init am error: ${e4}`);
              t4 = e4;
            }
            if (!e3 || !r3 || !i3) {
              if ("undefined" != typeof window) {
                e3 = new u2.default();
                r3 = new c2.default();
                i3 = new l2.default();
              }
            }
            if (!e3 || !r3 || !i3)
              throw new Error(`init am error: no api impl found, ${t4}`);
          }
          function _2() {
            if (!e3)
              S22();
            return e3;
          }
          t3.getDevice = _2;
          function b2() {
            if (!r3)
              S22();
            return r3;
          }
          t3.getStorage = b2;
          function E2() {
            if (!i3)
              S22();
            return i3;
          }
          t3.getWebSocket = E2;
        })(S2 || (S2 = {}));
        e22["default"] = S2;
      }, 4685: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(9478));
        var s2;
        (function(t3) {
          function e3() {
            return n2.default.getDevice().os();
          }
          t3.os = e3;
          function r3() {
            return n2.default.getDevice().osVersion();
          }
          t3.osVersion = r3;
          function i3() {
            return n2.default.getDevice().model();
          }
          t3.model = i3;
          function s22() {
            return n2.default.getDevice().brand();
          }
          t3.brand = s22;
          function a2() {
            return n2.default.getDevice().platform();
          }
          t3.platform = a2;
          function o2() {
            return n2.default.getDevice().platformVersion();
          }
          t3.platformVersion = o2;
          function u2() {
            return n2.default.getDevice().platformId();
          }
          t3.platformId = u2;
          function c2() {
            return n2.default.getDevice().language();
          }
          t3.language = c2;
          function l2() {
            let t4 = n2.default.getDevice().userAgent;
            if (t4)
              return t4();
            return "";
          }
          t3.userAgent = l2;
          function f2(t4) {
            n2.default.getDevice().getNetworkType(t4);
          }
          t3.getNetworkType = f2;
          function h2(t4) {
            n2.default.getDevice().onNetworkStatusChange(t4);
          }
          t3.onNetworkStatusChange = h2;
        })(s2 || (s2 = {}));
        e22["default"] = s2;
      }, 7002: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(6379));
        const s2 = i22(r22(1386));
        const a2 = i22(r22(4054));
        const o2 = r22(2918);
        const u2 = i22(r22(7167));
        const c2 = i22(r22(529));
        const l2 = i22(r22(9478));
        const f2 = i22(r22(8506));
        var h2;
        (function(t3) {
          let e3;
          let r3 = false;
          let i3 = false;
          let h22 = false;
          let d2 = [];
          const v2 = 10;
          let p2 = 0;
          t3.allowReconnect = true;
          function g2() {
            return r3 && i3;
          }
          t3.isAvailable = g2;
          function y2(e4) {
            let r4 = (/* @__PURE__ */ new Date()).getTime();
            if (r4 - p2 < 1e3) {
              c2.default.warn(`enableSocket ${e4} fail: this function can only be called once a second`);
              return;
            }
            p2 = r4;
            t3.allowReconnect = e4;
            if (e4)
              t3.reconnect(10);
            else
              t3.close(`enableSocket ${e4}`);
          }
          t3.enableSocket = y2;
          function m2(e4 = 0) {
            if (!t3.allowReconnect)
              return;
            if (!_2())
              return;
            setTimeout(function() {
              w2();
            }, e4);
          }
          t3.reconnect = m2;
          function w2() {
            t3.allowReconnect = true;
            if (!_2())
              return;
            if (!b2())
              return;
            h22 = true;
            let r4 = n2.default.socketUrl;
            try {
              let t4 = f2.default.getSync(f2.default.KEY_REDIRECT_SERVER, "");
              if (t4) {
                let e4 = o2.RedirectServerData.parse(t4);
                let i4 = e4.addressList[0].split(",");
                let n22 = i4[0];
                let s22 = Number(i4[1]);
                let a22 = (/* @__PURE__ */ new Date()).getTime();
                if (a22 - e4.time < 1e3 * s22)
                  r4 = n22;
              }
            } catch (t4) {
            }
            e3 = l2.default.getWebSocket().connect({ url: r4, success: function() {
              i3 = true;
              S2();
            }, fail: function() {
              i3 = false;
              M2();
              m2(100);
            } });
            e3.onOpen(T2);
            e3.onClose(x);
            e3.onError(A2);
            e3.onMessage(I2);
          }
          t3.connect = w2;
          function S2() {
            if (i3 && r3) {
              h22 = false;
              s2.default.create().send();
              u2.default.getInstance().start();
            }
          }
          function _2() {
            if (!n2.default.networkConnected) {
              c2.default.error(`connect failed, network is not available`);
              return false;
            }
            if (h22) {
              c2.default.warn(`connecting`);
              return false;
            }
            if (g2()) {
              c2.default.warn(`already connected`);
              return false;
            }
            return true;
          }
          function b2() {
            var t4 = d2.length;
            let e4 = (/* @__PURE__ */ new Date()).getTime();
            if (t4 > 0) {
              for (var r4 = t4 - 1; r4 >= 0; r4--)
                if (e4 - d2[r4] > 5e3) {
                  d2.splice(0, r4 + 1);
                  break;
                }
            }
            t4 = d2.length;
            d2.push(e4);
            if (t4 >= v2) {
              c2.default.error("connect failed, connection limit reached");
              return false;
            }
            return true;
          }
          function E2(t4 = "") {
            null === e3 || void 0 === e3 || e3.close({ code: 1e3, reason: t4, success: function(t5) {
            }, fail: function(t5) {
            } });
            M2();
          }
          t3.close = E2;
          function D2(t4) {
            if (r3 && r3)
              null === e3 || void 0 === e3 || e3.send({ data: t4, success: function(t5) {
              }, fail: function(t5) {
              } });
            else
              throw new Error(`socket not connect`);
          }
          t3.send = D2;
          function M2(t4) {
            var e4;
            i3 = false;
            r3 = false;
            h22 = false;
            u2.default.getInstance().cancel();
            if (n2.default.online) {
              n2.default.online = false;
              null === (e4 = n2.default.onlineState) || void 0 === e4 || e4.call(n2.default.onlineState, { online: n2.default.online });
            }
          }
          let T2 = function(t4) {
            r3 = true;
            S2();
          };
          let I2 = function(t4) {
            try {
              t4.data;
              u2.default.getInstance().refresh();
              a2.default.receiveMessage(t4.data);
            } catch (t5) {
            }
          };
          let A2 = function(t4) {
            E2(`socket error`);
          };
          let x = function(t4) {
            M2();
          };
        })(h2 || (h2 = {}));
        e22["default"] = h2;
      }, 8506: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(9478));
        var s2;
        (function(t3) {
          t3.KEY_APPID = "getui_appid";
          t3.KEY_CID = "getui_cid";
          t3.KEY_SESSION = "getui_session";
          t3.KEY_REGID = "getui_regid";
          t3.KEY_SOCKET_URL = "getui_socket_url";
          t3.KEY_DEVICE_ID = "getui_deviceid";
          t3.KEY_ADD_PHONE_INFO_TIME = "getui_api_time";
          t3.KEY_BIND_ALIAS_TIME = "getui_ba_time";
          t3.KEY_SET_TAG_TIME = "getui_st_time";
          t3.KEY_REDIRECT_SERVER = "getui_redirect_server";
          t3.KEY_LAST_CONNECT_TIME = "getui_last_connect_time";
          function e3(t4) {
            n2.default.getStorage().set(t4);
          }
          t3.set = e3;
          function r3(t4, e4) {
            n2.default.getStorage().setSync(t4, e4);
          }
          t3.setSync = r3;
          function i3(t4) {
            n2.default.getStorage().get(t4);
          }
          t3.get = i3;
          function s22(t4, e4) {
            let r4 = n2.default.getStorage().getSync(t4);
            return r4 ? r4 : e4;
          }
          t3.getSync = s22;
        })(s2 || (s2 = {}));
        e22["default"] = s2;
      }, 496: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        const n2 = i22(r22(3854));
        class s2 {
          constructor() {
            this.systemInfo = my.getSystemInfoSync();
          }
          os() {
            return n2.default.getStr(this.systemInfo, "platform");
          }
          osVersion() {
            return n2.default.getStr(this.systemInfo, "system");
          }
          model() {
            return n2.default.getStr(this.systemInfo, "model");
          }
          brand() {
            return n2.default.getStr(this.systemInfo, "brand");
          }
          platform() {
            return "MP-ALIPAY";
          }
          platformVersion() {
            return n2.default.getStr(this.systemInfo, "app") + " " + n2.default.getStr(this.systemInfo, "version");
          }
          platformId() {
            return my.getAppIdSync();
          }
          language() {
            return n2.default.getStr(this.systemInfo, "language");
          }
          getNetworkType(t3) {
            my.getNetworkType({ success: (e3) => {
              var r3;
              null === (r3 = t3.success) || void 0 === r3 || r3.call(t3.success, { networkType: e3.networkType });
            }, fail: () => {
              var e3;
              null === (e3 = t3.fail) || void 0 === e3 || e3.call(t3.fail, "");
            } });
          }
          onNetworkStatusChange(t3) {
            my.onNetworkStatusChange(t3);
          }
        }
        t22.exports = s2;
      }, 3555: (t22) => {
        class e22 {
          set(t3) {
            my.setStorage({ key: t3.key, data: t3.data, success: t3.success, fail: t3.fail });
          }
          setSync(t3, e3) {
            my.setStorageSync({ key: t3, data: e3 });
          }
          get(t3) {
            my.getStorage({ key: t3.key, success: t3.success, fail: t3.fail, complete: t3.complete });
          }
          getSync(t3) {
            return my.getStorageSync({ key: t3 }).data;
          }
        }
        t22.exports = e22;
      }, 1929: (t22) => {
        class e22 {
          connect(t3) {
            my.connectSocket({ url: t3.url, header: t3.header, method: t3.method, success: t3.success, fail: t3.fail, complete: t3.complete });
            return { onOpen: my.onSocketOpen, send: my.sendSocketMessage, onMessage: (t4) => {
              my.onSocketMessage.call(my.onSocketMessage, (e3) => {
                t4.call(t4, { data: e3 ? e3.data : "" });
              });
            }, onError: my.onSocketError, onClose: my.onSocketClose, close: my.closeSocket };
          }
        }
        t22.exports = e22;
      }, 4379: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          os() {
            let t3 = window.navigator.userAgent.toLowerCase();
            if (t3.indexOf("android") > 0 || t3.indexOf("adr") > 0)
              return "android";
            if (!!t3.match(/\(i[^;]+;( u;)? cpu.+mac os x/))
              return "ios";
            if (t3.indexOf("windows") > 0 || t3.indexOf("win32") > 0 || t3.indexOf("win64") > 0)
              return "windows";
            if (t3.indexOf("macintosh") > 0 || t3.indexOf("mac os") > 0)
              return "mac os";
            if (t3.indexOf("linux") > 0)
              return "linux";
            if (t3.indexOf("unix") > 0)
              return "linux";
            return "other";
          }
          osVersion() {
            let t3 = window.navigator.userAgent.toLowerCase();
            let e3 = t3.substring(t3.indexOf(";") + 1).trim();
            if (e3.indexOf(";") > 0)
              return e3.substring(0, e3.indexOf(";")).trim();
            return e3.substring(0, e3.indexOf(")")).trim();
          }
          model() {
            return "";
          }
          brand() {
            return "";
          }
          platform() {
            return "H5";
          }
          platformVersion() {
            return "";
          }
          platformId() {
            return "";
          }
          language() {
            return window.navigator.language;
          }
          userAgent() {
            return window.navigator.userAgent;
          }
          getNetworkType(t3) {
            var e3;
            null === (e3 = t3.success) || void 0 === e3 || e3.call(t3.success, { networkType: window.navigator.onLine ? "unknown" : "none" });
          }
          onNetworkStatusChange(t3) {
          }
        }
        e22["default"] = r22;
      }, 6899: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          set(t3) {
            var e3;
            window.localStorage.setItem(t3.key, t3.data);
            null === (e3 = t3.success) || void 0 === e3 || e3.call(t3.success, "");
          }
          setSync(t3, e3) {
            window.localStorage.setItem(t3, e3);
          }
          get(t3) {
            var e3;
            let r3 = window.localStorage.getItem(t3.key);
            null === (e3 = t3.success) || void 0 === e3 || e3.call(t3.success, r3);
          }
          getSync(t3) {
            return window.localStorage.getItem(t3);
          }
        }
        e22["default"] = r22;
      }, 776: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          connect(t3) {
            let e3 = new WebSocket(t3.url);
            return { send: (t4) => {
              var r3, i22;
              try {
                e3.send(t4.data);
                null === (r3 = t4.success) || void 0 === r3 || r3.call(t4.success, { errMsg: "" });
              } catch (e4) {
                null === (i22 = t4.fail) || void 0 === i22 || i22.call(t4.fail, { errMsg: e4 + "" });
              }
            }, close: (t4) => {
              var r3, i22;
              try {
                e3.close(t4.code, t4.reason);
                null === (r3 = t4.success) || void 0 === r3 || r3.call(t4.success, { errMsg: "" });
              } catch (e4) {
                null === (i22 = t4.fail) || void 0 === i22 || i22.call(t4.fail, { errMsg: e4 + "" });
              }
            }, onOpen: (r3) => {
              e3.onopen = (e4) => {
                var i22;
                null === (i22 = t3.success) || void 0 === i22 || i22.call(t3.success, "");
                r3({ header: "" });
              };
            }, onError: (r3) => {
              e3.onerror = (e4) => {
                var i22;
                null === (i22 = t3.fail) || void 0 === i22 || i22.call(t3.fail, "");
                r3({ errMsg: "" });
              };
            }, onMessage: (t4) => {
              e3.onmessage = (e4) => {
                t4({ data: e4.data });
              };
            }, onClose: (t4) => {
              e3.onclose = (e4) => {
                t4(e4);
              };
            } };
          }
        }
        e22["default"] = r22;
      }, 2002: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(3854));
        class s2 {
          constructor() {
            this.systemInfo = tt.getSystemInfoSync();
          }
          os() {
            return n2.default.getStr(this.systemInfo, "platform");
          }
          osVersion() {
            return n2.default.getStr(this.systemInfo, "system");
          }
          model() {
            return n2.default.getStr(this.systemInfo, "model");
          }
          brand() {
            return n2.default.getStr(this.systemInfo, "brand");
          }
          platform() {
            return "MP-TOUTIAO";
          }
          platformVersion() {
            return n2.default.getStr(this.systemInfo, "appName") + " " + n2.default.getStr(this.systemInfo, "version");
          }
          language() {
            return "";
          }
          platformId() {
            return "";
          }
          getNetworkType(t3) {
            tt.getNetworkType(t3);
          }
          onNetworkStatusChange(t3) {
            tt.onNetworkStatusChange(t3);
          }
        }
        e22["default"] = s2;
      }, 5807: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          set(t3) {
            tt.setStorage(t3);
          }
          setSync(t3, e3) {
            tt.setStorageSync(t3, e3);
          }
          get(t3) {
            tt.getStorage(t3);
          }
          getSync(t3) {
            return tt.getStorageSync(t3);
          }
        }
        e22["default"] = r22;
      }, 9704: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          connect(t3) {
            let e3 = tt.connectSocket({ url: t3.url, header: t3.header, protocols: t3.protocols, success: t3.success, fail: t3.fail, complete: t3.complete });
            return { onOpen: e3.onOpen, send: e3.send, onMessage: e3.onMessage, onError: e3.onError, onClose: e3.onClose, close: e3.close };
          }
        }
        e22["default"] = r22;
      }, 6545: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(3854));
        class s2 {
          constructor() {
            try {
              this.systemInfo = uni.getSystemInfoSync();
              this.accountInfo = uni.getAccountInfoSync();
            } catch (t3) {
            }
          }
          os() {
            return n2.default.getStr(this.systemInfo, "platform");
          }
          model() {
            return n2.default.getStr(this.systemInfo, "model");
          }
          brand() {
            return n2.default.getStr(this.systemInfo, "brand");
          }
          osVersion() {
            return n2.default.getStr(this.systemInfo, "system");
          }
          platform() {
            let t3 = "";
            t3 = "APP-PLUS";
            return t3;
          }
          platformVersion() {
            return this.systemInfo ? this.systemInfo.version : "";
          }
          platformId() {
            return this.accountInfo ? this.accountInfo.miniProgram.appId : "";
          }
          language() {
            var t3;
            return (null === (t3 = this.systemInfo) || void 0 === t3 ? void 0 : t3.language) ? this.systemInfo.language : "";
          }
          userAgent() {
            return window ? window.navigator.userAgent : "";
          }
          getNetworkType(t3) {
            uni.getNetworkType(t3);
          }
          onNetworkStatusChange(t3) {
            uni.onNetworkStatusChange(t3);
          }
        }
        e22["default"] = s2;
      }, 3680: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          set(t3) {
            uni.setStorage(t3);
          }
          setSync(t3, e3) {
            uni.setStorageSync(t3, e3);
          }
          get(t3) {
            uni.getStorage(t3);
          }
          getSync(t3) {
            return uni.getStorageSync(t3);
          }
        }
        e22["default"] = r22;
      }, 7706: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          connect(t3) {
            let e3 = uni.connectSocket(t3);
            return { send: (t4) => {
              null === e3 || void 0 === e3 || e3.send(t4);
            }, close: (t4) => {
              null === e3 || void 0 === e3 || e3.close(t4);
            }, onOpen: (t4) => {
              null === e3 || void 0 === e3 || e3.onOpen(t4);
            }, onError: (t4) => {
              null === e3 || void 0 === e3 || e3.onError(t4);
            }, onMessage: (t4) => {
              null === e3 || void 0 === e3 || e3.onMessage(t4);
            }, onClose: (t4) => {
              null === e3 || void 0 === e3 || e3.onClose(t4);
            } };
          }
        }
        e22["default"] = r22;
      }, 4486: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(3854));
        class s2 {
          constructor() {
            this.systemInfo = wx.getSystemInfoSync();
          }
          os() {
            return n2.default.getStr(this.systemInfo, "platform");
          }
          osVersion() {
            return n2.default.getStr(this.systemInfo, "system");
          }
          model() {
            return n2.default.getStr(this.systemInfo, "model");
          }
          brand() {
            return n2.default.getStr(this.systemInfo, "brand");
          }
          platform() {
            return "MP-WEIXIN";
          }
          platformVersion() {
            return n2.default.getStr(this.systemInfo, "version");
          }
          language() {
            return n2.default.getStr(this.systemInfo, "language");
          }
          platformId() {
            if (wx.canIUse("getAccountInfoSync"))
              return wx.getAccountInfoSync().miniProgram.appId;
            return "";
          }
          getNetworkType(t3) {
            wx.getNetworkType({ success: (e3) => {
              var r3;
              null === (r3 = t3.success) || void 0 === r3 || r3.call(t3.success, { networkType: e3.networkType });
            }, fail: t3.fail });
          }
          onNetworkStatusChange(t3) {
            wx.onNetworkStatusChange(t3);
          }
        }
        e22["default"] = s2;
      }, 5867: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          set(t3) {
            wx.setStorage(t3);
          }
          setSync(t3, e3) {
            wx.setStorageSync(t3, e3);
          }
          get(t3) {
            wx.getStorage(t3);
          }
          getSync(t3) {
            return wx.getStorageSync(t3);
          }
        }
        e22["default"] = r22;
      }, 7006: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          connect(t3) {
            let e3 = wx.connectSocket({ url: t3.url, header: t3.header, protocols: t3.protocols, success: t3.success, fail: t3.fail, complete: t3.complete });
            return { onOpen: e3.onOpen, send: e3.send, onMessage: e3.onMessage, onError: e3.onError, onClose: e3.onClose, close: e3.close };
          }
        }
        e22["default"] = r22;
      }, 6893: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        var r22;
        (function(t3) {
          t3.SDK_VERSION = "GTMP-2.0.4.dcloud";
          t3.DEFAULT_SOCKET_URL = "wss://wshzn.gepush.com:5223/nws";
          t3.SOCKET_PROTOCOL_VERSION = "1.0";
          t3.SERVER_PUBLIC_KEY = "MHwwDQYJKoZIhvcNAQEBBQADawAwaAJhAJp1rROuvBF7sBSnvLaesj2iFhMcY8aXyLvpnNLKs2wjL3JmEnyr++SlVa35liUlzi83tnAFkn3A9GB7pHBNzawyUkBh8WUhq5bnFIkk2RaDa6+5MpG84DEv52p7RR+aWwIDAQAB";
          t3.SERVER_PUBLIC_KEY_ID = "69d747c4b9f641baf4004be4297e9f3b";
          t3.ID_U_2_G = true;
        })(r22 || (r22 = {}));
        e22["default"] = r22;
      }, 7555: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(7002));
        const s2 = i22(r22(529));
        const a2 = i22(r22(6379));
        class o2 {
          static init(t3) {
            var e3;
            if (this.inited)
              return;
            try {
              this.checkAppid(t3.appid);
              this.inited = true;
              s2.default.info(`init: appid=${t3.appid}`);
              a2.default.init(t3);
              n2.default.connect();
            } catch (r3) {
              this.inited = false;
              null === (e3 = t3.onError) || void 0 === e3 || e3.call(t3.onError, { error: r3 });
              throw r3;
            }
          }
          static enableSocket(t3) {
            this.checkInit();
            n2.default.enableSocket(t3);
          }
          static checkInit() {
            if (!this.inited)
              throw new Error(`not init, please invoke init method firstly`);
          }
          static checkAppid(t3) {
            if (null == t3 || void 0 == t3 || "" == t3.trim())
              throw new Error(`invalid appid ${t3}`);
          }
        }
        o2.inited = false;
        e22["default"] = o2;
      }, 6379: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(6667));
        const s2 = i22(r22(8506));
        const a2 = i22(r22(6893));
        const o2 = i22(r22(7002));
        const u2 = i22(r22(529));
        const c2 = i22(r22(4685));
        const l2 = i22(r22(2323));
        class f2 {
          static init(t3) {
            var e3;
            if (a2.default.ID_U_2_G)
              this.appid = l2.default.to_getui(t3.appid);
            else
              this.appid = t3.appid;
            this.onError = t3.onError;
            this.onClientId = t3.onClientId;
            this.onlineState = t3.onlineState;
            this.onPushMsg = t3.onPushMsg;
            if (this.appid != s2.default.getSync(s2.default.KEY_APPID, this.appid)) {
              u2.default.info("appid changed, clear session and cid");
              s2.default.setSync(s2.default.KEY_CID, "");
              s2.default.setSync(s2.default.KEY_SESSION, "");
            }
            s2.default.setSync(s2.default.KEY_APPID, this.appid);
            this.cid = s2.default.getSync(s2.default.KEY_CID, this.cid);
            if (this.cid)
              null === (e3 = this.onClientId) || void 0 === e3 || e3.call(this.onClientId, { cid: f2.cid });
            this.session = s2.default.getSync(s2.default.KEY_SESSION, this.session);
            this.deviceId = s2.default.getSync(s2.default.KEY_DEVICE_ID, this.deviceId);
            this.regId = s2.default.getSync(s2.default.KEY_REGID, this.regId);
            if (!this.regId) {
              this.regId = this.createRegId();
              s2.default.set({ key: s2.default.KEY_REGID, data: this.regId });
            }
            this.socketUrl = s2.default.getSync(s2.default.KEY_SOCKET_URL, this.socketUrl);
            let r3 = this;
            c2.default.getNetworkType({ success: (t4) => {
              r3.networkType = t4.networkType;
              r3.networkConnected = "none" != r3.networkType && "" != r3.networkType;
            } });
            c2.default.onNetworkStatusChange((t4) => {
              r3.networkConnected = t4.isConnected;
              r3.networkType = t4.networkType;
              if (r3.networkConnected)
                o2.default.reconnect(100);
            });
          }
          static createRegId() {
            return `M-V${n2.default.md5Hex(this.getUuid())}-${(/* @__PURE__ */ new Date()).getTime()}`;
          }
          static getUuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t3) {
              let e3 = 16 * Math.random() | 0, r3 = "x" === t3 ? e3 : 3 & e3 | 8;
              return r3.toString(16);
            });
          }
        }
        f2.appid = "";
        f2.cid = "";
        f2.regId = "";
        f2.session = "";
        f2.deviceId = "";
        f2.packetId = 1;
        f2.online = false;
        f2.socketUrl = a2.default.DEFAULT_SOCKET_URL;
        f2.publicKeyId = a2.default.SERVER_PUBLIC_KEY_ID;
        f2.publicKey = a2.default.SERVER_PUBLIC_KEY;
        f2.lastAliasTime = 0;
        f2.networkConnected = true;
        f2.networkType = "none";
        e22["default"] = f2;
      }, 9586: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2, s2;
        Object.defineProperty(e22, "__esModule", { value: true });
        const a2 = i22(r22(661));
        const o2 = r22(4198);
        const u2 = i22(r22(6379));
        class c2 extends a2.default {
          constructor() {
            super(...arguments);
            this.actionMsgData = new l2();
          }
          static initActionMsg(t3, ...e3) {
            super.initMsg(t3);
            t3.command = a2.default.Command.CLIENT_MSG;
            t3.data = t3.actionMsgData = l2.create();
            return t3;
          }
          static parseActionMsg(t3, e3) {
            super.parseMsg(t3, e3);
            t3.actionMsgData = l2.parse(t3.data);
            return t3;
          }
          send() {
            setTimeout(() => {
              var t3;
              if (c2.waitingLoginMsgMap.has(this.actionMsgData.msgId) || c2.waitingResponseMsgMap.has(this.actionMsgData.msgId)) {
                c2.waitingLoginMsgMap.delete(this.actionMsgData.msgId);
                c2.waitingResponseMsgMap.delete(this.actionMsgData.msgId);
                null === (t3 = this.callback) || void 0 === t3 || t3.call(this.callback, { resultCode: o2.ErrorCode.TIME_OUT, message: "waiting time out" });
              }
            }, 1e4);
            if (!u2.default.online) {
              c2.waitingLoginMsgMap.set(this.actionMsgData.msgId, this);
              return;
            }
            if (this.actionMsgData.msgAction != c2.ClientAction.RECEIVED)
              c2.waitingResponseMsgMap.set(this.actionMsgData.msgId, this);
            super.send();
          }
          receive() {
          }
          static sendWaitingMessages() {
            let t3 = this.waitingLoginMsgMap.keys();
            let e3;
            while (e3 = t3.next(), !e3.done) {
              let t4 = this.waitingLoginMsgMap.get(e3.value);
              this.waitingLoginMsgMap.delete(e3.value);
              null === t4 || void 0 === t4 || t4.send();
            }
          }
          static getWaitingResponseMessage(t3) {
            return c2.waitingResponseMsgMap.get(t3);
          }
          static removeWaitingResponseMessage(t3) {
            let e3 = c2.waitingResponseMsgMap.get(t3);
            if (e3)
              c2.waitingResponseMsgMap.delete(t3);
            return e3;
          }
        }
        c2.ServerAction = (n2 = class {
        }, n2.PUSH_MESSAGE = "pushmessage", n2.REDIRECT_SERVER = "redirect_server", n2.ADD_PHONE_INFO_RESULT = "addphoneinfo", n2.SET_MODE_RESULT = "set_mode_result", n2.SET_TAG_RESULT = "settag_result", n2.BIND_ALIAS_RESULT = "response_bind", n2.UNBIND_ALIAS_RESULT = "response_unbind", n2.FEED_BACK_RESULT = "pushmessage_feedback", n2.RECEIVED = "received", n2);
        c2.ClientAction = (s2 = class {
        }, s2.ADD_PHONE_INFO = "addphoneinfo", s2.SET_MODE = "set_mode", s2.FEED_BACK = "pushmessage_feedback", s2.SET_TAGS = "set_tag", s2.BIND_ALIAS = "bind_alias", s2.UNBIND_ALIAS = "unbind_alias", s2.RECEIVED = "received", s2);
        c2.waitingLoginMsgMap = /* @__PURE__ */ new Map();
        c2.waitingResponseMsgMap = /* @__PURE__ */ new Map();
        class l2 {
          constructor() {
            this.appId = "";
            this.cid = "";
            this.msgId = "";
            this.msgAction = "";
            this.msgData = "";
            this.msgExtraData = "";
          }
          static create() {
            let t3 = new l2();
            t3.appId = u2.default.appid;
            t3.cid = u2.default.cid;
            t3.msgId = (2147483647 & (/* @__PURE__ */ new Date()).getTime()).toString();
            return t3;
          }
          static parse(t3) {
            let e3 = new l2();
            let r3 = JSON.parse(t3);
            e3.appId = r3.appId;
            e3.cid = r3.cid;
            e3.msgId = r3.msgId;
            e3.msgAction = r3.msgAction;
            e3.msgData = r3.msgData;
            e3.msgExtraData = r3.msgExtraData;
            return e3;
          }
        }
        e22["default"] = c2;
      }, 4516: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(4685));
        const s2 = i22(r22(8506));
        const a2 = i22(r22(6893));
        const o2 = r22(4198);
        const u2 = i22(r22(9586));
        const c2 = i22(r22(6379));
        class l2 extends u2.default {
          constructor() {
            super(...arguments);
            this.addPhoneInfoData = new f2();
          }
          static create() {
            let t3 = new l2();
            super.initActionMsg(t3);
            t3.callback = (e3) => {
              if (e3.resultCode != o2.ErrorCode.SUCCESS && e3.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
                setTimeout(function() {
                  t3.send();
                }, 30 * 1e3);
              else
                s2.default.set({ key: s2.default.KEY_ADD_PHONE_INFO_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
            };
            t3.actionMsgData.msgAction = u2.default.ClientAction.ADD_PHONE_INFO;
            t3.addPhoneInfoData = f2.create();
            t3.actionMsgData.msgData = JSON.stringify(t3.addPhoneInfoData);
            return t3;
          }
          send() {
            let t3 = (/* @__PURE__ */ new Date()).getTime();
            let e3 = s2.default.getSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
            if (t3 - e3 < 24 * 60 * 60 * 1e3)
              return;
            super.send();
          }
        }
        class f2 {
          constructor() {
            this.model = "";
            this.brand = "";
            this.system_version = "";
            this.version = "";
            this.deviceid = "";
            this.type = "";
          }
          static create() {
            let t3 = new f2();
            t3.model = n2.default.model();
            t3.brand = n2.default.brand();
            t3.system_version = n2.default.osVersion();
            t3.version = a2.default.SDK_VERSION;
            t3.device_token = "";
            t3.imei = "";
            t3.oaid = "";
            t3.mac = "";
            t3.idfa = "";
            t3.type = "MINIPROGRAM";
            t3.deviceid = `${t3.type}-${c2.default.deviceId}`;
            t3.extra = { os: n2.default.os(), platform: n2.default.platform(), platformVersion: n2.default.platformVersion(), platformId: n2.default.platformId(), language: n2.default.language(), userAgent: n2.default.userAgent() };
            return t3;
          }
        }
        e22["default"] = l2;
      }, 8723: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2, s2;
        Object.defineProperty(e22, "__esModule", { value: true });
        const a2 = i22(r22(6379));
        const o2 = r22(4198);
        const u2 = i22(r22(9586));
        class c2 extends u2.default {
          constructor() {
            super(...arguments);
            this.feedbackData = new l2();
          }
          static create(t3, e3) {
            let r3 = new c2();
            super.initActionMsg(r3);
            r3.callback = (t4) => {
              if (t4.resultCode != o2.ErrorCode.SUCCESS && t4.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
                setTimeout(function() {
                  r3.send();
                }, 30 * 1e3);
            };
            r3.feedbackData = l2.create(t3, e3);
            r3.actionMsgData.msgAction = u2.default.ClientAction.FEED_BACK;
            r3.actionMsgData.msgData = JSON.stringify(r3.feedbackData);
            return r3;
          }
          send() {
            super.send();
          }
        }
        c2.ActionId = (n2 = class {
        }, n2.RECEIVE = "0", n2.MP_RECEIVE = "210000", n2.WEB_RECEIVE = "220000", n2.BEGIN = "1", n2);
        c2.RESULT = (s2 = class {
        }, s2.OK = "ok", s2);
        class l2 {
          constructor() {
            this.messageid = "";
            this.appkey = "";
            this.appid = "";
            this.taskid = "";
            this.actionid = "";
            this.result = "";
            this.timestamp = "";
          }
          static create(t3, e3) {
            let r3 = new l2();
            r3.messageid = t3.pushMessageData.messageid;
            r3.appkey = t3.pushMessageData.appKey;
            r3.appid = a2.default.appid;
            r3.taskid = t3.pushMessageData.taskId;
            r3.actionid = e3;
            r3.result = c2.RESULT.OK;
            r3.timestamp = (/* @__PURE__ */ new Date()).getTime().toString();
            return r3;
          }
        }
        e22["default"] = c2;
      }, 6362: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(661));
        class s2 extends n2.default {
          static create() {
            let t3 = new s2();
            super.initMsg(t3);
            t3.command = n2.default.Command.HEART_BEAT;
            return t3;
          }
        }
        e22["default"] = s2;
      }, 1386: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(6667));
        const s2 = i22(r22(6379));
        const a2 = i22(r22(661));
        class o2 extends a2.default {
          constructor() {
            super(...arguments);
            this.keyNegotiateData = new u2();
          }
          static create() {
            let t3 = new o2();
            super.initMsg(t3);
            t3.command = a2.default.Command.KEY_NEGOTIATE;
            n2.default.resetKey();
            t3.data = t3.keyNegotiateData = u2.create();
            return t3;
          }
          send() {
            super.send();
          }
        }
        class u2 {
          constructor() {
            this.appId = "";
            this.rsaPublicKeyId = "";
            this.algorithm = "";
            this.secretKey = "";
            this.iv = "";
          }
          static create() {
            let t3 = new u2();
            t3.appId = s2.default.appid;
            t3.rsaPublicKeyId = s2.default.publicKeyId;
            t3.algorithm = "AES";
            t3.secretKey = n2.default.getEncryptedSecretKey();
            t3.iv = n2.default.getEncryptedIV();
            return t3;
          }
        }
        e22["default"] = o2;
      }, 1280: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(661));
        const s2 = i22(r22(6667));
        const a2 = i22(r22(8858));
        const o2 = i22(r22(529));
        const u2 = i22(r22(6379));
        class c2 extends n2.default {
          constructor() {
            super(...arguments);
            this.keyNegotiateResultData = new l2();
          }
          static parse(t3) {
            let e3 = new c2();
            super.parseMsg(e3, t3);
            e3.keyNegotiateResultData = l2.parse(e3.data);
            return e3;
          }
          receive() {
            var t3, e3;
            if (0 != this.keyNegotiateResultData.errorCode) {
              o2.default.error(`key negotiate fail: ${this.data}`);
              null === (t3 = u2.default.onError) || void 0 === t3 || t3.call(u2.default.onError, { error: `key negotiate fail: ${this.data}` });
              return;
            }
            let r3 = this.keyNegotiateResultData.encryptType.split("/");
            if (!s2.default.algorithmMap.has(r3[0].trim().toLowerCase()) || !s2.default.modeMap.has(r3[1].trim().toLowerCase()) || !s2.default.paddingMap.has(r3[2].trim().toLowerCase())) {
              o2.default.error(`key negotiate fail: ${this.data}`);
              null === (e3 = u2.default.onError) || void 0 === e3 || e3.call(u2.default.onError, { error: `key negotiate fail: ${this.data}` });
              return;
            }
            s2.default.setEncryptParams(r3[0].trim().toLowerCase(), r3[1].trim().toLowerCase(), r3[2].trim().toLowerCase());
            a2.default.create().send();
          }
        }
        class l2 {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
            this.encryptType = "";
          }
          static parse(t3) {
            let e3 = new l2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            e3.encryptType = r3.encryptType;
            return e3;
          }
        }
        e22["default"] = c2;
      }, 8858: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(6379));
        const s2 = i22(r22(6667));
        const a2 = i22(r22(661));
        const o2 = i22(r22(4534));
        class u2 extends a2.default {
          constructor() {
            super(...arguments);
            this.loginData = new c2();
          }
          static create() {
            let t3 = new u2();
            super.initMsg(t3);
            t3.command = a2.default.Command.LOGIN;
            t3.data = t3.loginData = c2.create();
            return t3;
          }
          send() {
            if (!this.loginData.session || n2.default.cid != s2.default.md5Hex(this.loginData.session)) {
              o2.default.create().send();
              return;
            }
            super.send();
          }
        }
        class c2 {
          constructor() {
            this.appId = "";
            this.session = "";
          }
          static create() {
            let t3 = new c2();
            t3.appId = n2.default.appid;
            t3.session = n2.default.session;
            return t3;
          }
        }
        e22["default"] = u2;
      }, 1606: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(8506));
        const s2 = i22(r22(661));
        const a2 = i22(r22(6379));
        const o2 = i22(r22(9586));
        const u2 = i22(r22(4516));
        const c2 = i22(r22(8858));
        class l2 extends s2.default {
          constructor() {
            super(...arguments);
            this.loginResultData = new f2();
          }
          static parse(t3) {
            let e3 = new l2();
            super.parseMsg(e3, t3);
            e3.loginResultData = f2.parse(e3.data);
            return e3;
          }
          receive() {
            var t3;
            if (0 != this.loginResultData.errorCode) {
              this.data;
              a2.default.session = a2.default.cid = "";
              n2.default.setSync(n2.default.KEY_CID, "");
              n2.default.setSync(n2.default.KEY_SESSION, "");
              c2.default.create().send();
              return;
            }
            if (!a2.default.online) {
              a2.default.online = true;
              null === (t3 = a2.default.onlineState) || void 0 === t3 || t3.call(a2.default.onlineState, { online: a2.default.online });
            }
            o2.default.sendWaitingMessages();
            u2.default.create().send();
          }
        }
        class f2 {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
            this.session = "";
          }
          static parse(t3) {
            let e3 = new f2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            e3.session = r3.session;
            return e3;
          }
        }
        e22["default"] = l2;
      }, 661: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2;
        Object.defineProperty(e22, "__esModule", { value: true });
        const s2 = i22(r22(9593));
        const a2 = i22(r22(7002));
        const o2 = i22(r22(6893));
        const u2 = i22(r22(6379));
        class c2 {
          constructor() {
            this.version = "";
            this.command = 0;
            this.packetId = 0;
            this.timeStamp = 0;
            this.data = "";
            this.signature = "";
          }
          static initMsg(t3, ...e3) {
            t3.version = o2.default.SOCKET_PROTOCOL_VERSION;
            t3.command = 0;
            t3.timeStamp = (/* @__PURE__ */ new Date()).getTime();
            return t3;
          }
          static parseMsg(t3, e3) {
            let r3 = JSON.parse(e3);
            t3.version = r3.version;
            t3.command = r3.command;
            t3.packetId = r3.packetId;
            t3.timeStamp = r3.timeStamp;
            t3.data = r3.data;
            t3.signature = r3.signature;
            return t3;
          }
          stringify() {
            return JSON.stringify(this, ["version", "command", "packetId", "timeStamp", "data", "signature"]);
          }
          send() {
            if (!a2.default.isAvailable())
              return;
            this.packetId = u2.default.packetId++;
            if (this.temp)
              this.data = this.temp;
            else
              this.temp = this.data;
            this.data = JSON.stringify(this.data);
            this.stringify();
            if (this.command != c2.Command.HEART_BEAT) {
              s2.default.sign(this);
              if (this.data && this.command != c2.Command.KEY_NEGOTIATE)
                s2.default.encrypt(this);
            }
            a2.default.send(this.stringify());
          }
        }
        c2.Command = (n2 = class {
        }, n2.HEART_BEAT = 0, n2.KEY_NEGOTIATE = 1, n2.KEY_NEGOTIATE_RESULT = 16, n2.REGISTER = 2, n2.REGISTER_RESULT = 32, n2.LOGIN = 3, n2.LOGIN_RESULT = 48, n2.LOGOUT = 4, n2.LOGOUT_RESULT = 64, n2.CLIENT_MSG = 5, n2.SERVER_MSG = 80, n2.SERVER_CLOSE = 96, n2.REDIRECT_SERVER = 112, n2);
        e22["default"] = c2;
      }, 9593: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(6667));
        var s2;
        (function(t3) {
          function e3(t4) {
            t4.data = n2.default.encrypt(t4.data);
          }
          t3.encrypt = e3;
          function r3(t4) {
            t4.data = n2.default.decrypt(t4.data);
          }
          t3.decrypt = r3;
          function i3(t4) {
            t4.signature = n2.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
          }
          t3.sign = i3;
          function s22(t4) {
            let e4 = n2.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
            if (t4.signature != e4)
              throw new Error(`msg signature vierfy failed`);
          }
          t3.verify = s22;
        })(s2 || (s2 = {}));
        e22["default"] = s2;
      }, 4054: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(1280));
        const s2 = i22(r22(1606));
        const a2 = i22(r22(661));
        const o2 = i22(r22(1277));
        const u2 = i22(r22(910));
        const c2 = i22(r22(9538));
        const l2 = i22(r22(9479));
        const f2 = i22(r22(6755));
        const h2 = i22(r22(2918));
        const d2 = i22(r22(9586));
        const v2 = i22(r22(9510));
        const p2 = i22(r22(4626));
        const g2 = i22(r22(7562));
        const y2 = i22(r22(9593));
        const m2 = i22(r22(9586));
        const w2 = i22(r22(9519));
        const S2 = i22(r22(8947));
        class _2 {
          static receiveMessage(t3) {
            let e3 = a2.default.parseMsg(new a2.default(), t3);
            if (e3.command == a2.default.Command.HEART_BEAT)
              return;
            if (e3.command != a2.default.Command.KEY_NEGOTIATE_RESULT && e3.command != a2.default.Command.SERVER_CLOSE && e3.command != a2.default.Command.REDIRECT_SERVER)
              y2.default.decrypt(e3);
            if (e3.command != a2.default.Command.SERVER_CLOSE && e3.command != a2.default.Command.REDIRECT_SERVER)
              y2.default.verify(e3);
            switch (e3.command) {
              case a2.default.Command.KEY_NEGOTIATE_RESULT:
                n2.default.parse(e3.stringify()).receive();
                break;
              case a2.default.Command.REGISTER_RESULT:
                o2.default.parse(e3.stringify()).receive();
                break;
              case a2.default.Command.LOGIN_RESULT:
                s2.default.parse(e3.stringify()).receive();
                break;
              case a2.default.Command.SERVER_MSG:
                this.receiveActionMsg(e3.stringify());
                break;
              case a2.default.Command.SERVER_CLOSE:
                S2.default.parse(e3.stringify()).receive();
                break;
              case a2.default.Command.REDIRECT_SERVER:
                h2.default.parse(e3.stringify()).receive();
                break;
            }
          }
          static receiveActionMsg(t3) {
            let e3 = m2.default.parseActionMsg(new m2.default(), t3);
            if (e3.actionMsgData.msgAction != d2.default.ServerAction.RECEIVED && e3.actionMsgData.msgAction != d2.default.ServerAction.REDIRECT_SERVER) {
              let t4 = JSON.parse(e3.actionMsgData.msgData);
              w2.default.create(t4.id).send();
            }
            switch (e3.actionMsgData.msgAction) {
              case d2.default.ServerAction.PUSH_MESSAGE:
                f2.default.parse(t3).receive();
                break;
              case d2.default.ServerAction.ADD_PHONE_INFO_RESULT:
                u2.default.parse(t3).receive();
                break;
              case d2.default.ServerAction.SET_MODE_RESULT:
                v2.default.parse(t3).receive();
                break;
              case d2.default.ServerAction.SET_TAG_RESULT:
                p2.default.parse(t3).receive();
                break;
              case d2.default.ServerAction.BIND_ALIAS_RESULT:
                c2.default.parse(t3).receive();
                break;
              case d2.default.ServerAction.UNBIND_ALIAS_RESULT:
                g2.default.parse(t3).receive();
                break;
              case d2.default.ServerAction.FEED_BACK_RESULT:
                l2.default.parse(t3).receive();
                break;
              case d2.default.ServerAction.RECEIVED:
                w2.default.parse(t3).receive();
                break;
            }
          }
        }
        e22["default"] = _2;
      }, 9519: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = r22(4198);
        const s2 = i22(r22(6379));
        const a2 = i22(r22(9586));
        class o2 extends a2.default {
          constructor() {
            super(...arguments);
            this.receivedData = new u2();
          }
          static create(t3) {
            let e3 = new o2();
            super.initActionMsg(e3);
            e3.callback = (t4) => {
              if (t4.resultCode != n2.ErrorCode.SUCCESS && t4.resultCode != n2.ErrorCode.REPEAT_MESSAGE)
                setTimeout(function() {
                  e3.send();
                }, 3 * 1e3);
            };
            e3.actionMsgData.msgAction = a2.default.ClientAction.RECEIVED;
            e3.receivedData = u2.create(t3);
            e3.actionMsgData.msgData = JSON.stringify(e3.receivedData);
            return e3;
          }
          static parse(t3) {
            let e3 = new o2();
            super.parseActionMsg(e3, t3);
            e3.receivedData = u2.parse(e3.data);
            return e3;
          }
          receive() {
            var t3;
            let e3 = a2.default.getWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3 && e3.actionMsgData.msgAction == a2.default.ClientAction.ADD_PHONE_INFO || e3 && e3.actionMsgData.msgAction == a2.default.ClientAction.FEED_BACK) {
              a2.default.removeWaitingResponseMessage(e3.actionMsgData.msgId);
              null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
            }
          }
          send() {
            super.send();
          }
        }
        class u2 {
          constructor() {
            this.msgId = "";
            this.cid = "";
          }
          static create(t3) {
            let e3 = new u2();
            e3.cid = s2.default.cid;
            e3.msgId = t3;
            return e3;
          }
          static parse(t3) {
            let e3 = new u2();
            let r3 = JSON.parse(t3);
            e3.cid = r3.cid;
            e3.msgId = r3.msgId;
            return e3;
          }
        }
        e22["default"] = o2;
      }, 2918: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        e22.RedirectServerData = void 0;
        const n2 = i22(r22(7002));
        const s2 = i22(r22(8506));
        const a2 = i22(r22(661));
        class o2 extends a2.default {
          constructor() {
            super(...arguments);
            this.redirectServerData = new u2();
          }
          static parse(t3) {
            let e3 = new o2();
            super.parseMsg(e3, t3);
            e3.redirectServerData = u2.parse(e3.data);
            return e3;
          }
          receive() {
            this.redirectServerData;
            s2.default.setSync(s2.default.KEY_REDIRECT_SERVER, JSON.stringify(this.redirectServerData));
            n2.default.close("redirect server");
            n2.default.reconnect(this.redirectServerData.delay);
          }
        }
        class u2 {
          constructor() {
            this.addressList = [];
            this.delay = 0;
            this.loc = "";
            this.conf = "";
            this.time = 0;
          }
          static parse(t3) {
            let e3 = new u2();
            let r3 = JSON.parse(t3);
            e3.addressList = r3.addressList;
            e3.delay = r3.delay;
            e3.loc = r3.loc;
            e3.conf = r3.conf;
            e3.time = r3.time ? r3.time : (/* @__PURE__ */ new Date()).getTime();
            return e3;
          }
        }
        e22.RedirectServerData = u2;
        e22["default"] = o2;
      }, 4534: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(6379));
        const s2 = i22(r22(661));
        class a2 extends s2.default {
          constructor() {
            super(...arguments);
            this.registerData = new o2();
          }
          static create() {
            let t3 = new a2();
            super.initMsg(t3);
            t3.command = s2.default.Command.REGISTER;
            t3.data = t3.registerData = o2.create();
            return t3;
          }
          send() {
            super.send();
          }
        }
        class o2 {
          constructor() {
            this.appId = "";
            this.regId = "";
          }
          static create() {
            let t3 = new o2();
            t3.appId = n2.default.appid;
            t3.regId = n2.default.regId;
            return t3;
          }
        }
        e22["default"] = a2;
      }, 1277: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(661));
        const s2 = i22(r22(8506));
        const a2 = i22(r22(6379));
        const o2 = i22(r22(8858));
        const u2 = i22(r22(529));
        class c2 extends n2.default {
          constructor() {
            super(...arguments);
            this.registerResultData = new l2();
          }
          static parse(t3) {
            let e3 = new c2();
            super.parseMsg(e3, t3);
            e3.registerResultData = l2.parse(e3.data);
            return e3;
          }
          receive() {
            var t3, e3;
            if (0 != this.registerResultData.errorCode || !this.registerResultData.cid || !this.registerResultData.session) {
              u2.default.error(`register fail: ${this.data}`);
              null === (t3 = a2.default.onError) || void 0 === t3 || t3.call(a2.default.onError, { error: `register fail: ${this.data}` });
              return;
            }
            if (a2.default.cid != this.registerResultData.cid)
              s2.default.setSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
            a2.default.cid = this.registerResultData.cid;
            null === (e3 = a2.default.onClientId) || void 0 === e3 || e3.call(a2.default.onClientId, { cid: a2.default.cid });
            s2.default.set({ key: s2.default.KEY_CID, data: a2.default.cid });
            a2.default.session = this.registerResultData.session;
            s2.default.set({ key: s2.default.KEY_SESSION, data: a2.default.session });
            a2.default.deviceId = this.registerResultData.deviceId;
            s2.default.set({ key: s2.default.KEY_DEVICE_ID, data: a2.default.deviceId });
            o2.default.create().send();
          }
        }
        class l2 {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
            this.cid = "";
            this.session = "";
            this.deviceId = "";
            this.regId = "";
          }
          static parse(t3) {
            let e3 = new l2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            e3.cid = r3.cid;
            e3.session = r3.session;
            e3.deviceId = r3.deviceId;
            e3.regId = r3.regId;
            return e3;
          }
        }
        e22["default"] = c2;
      }, 8947: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(7002));
        const s2 = i22(r22(529));
        const a2 = i22(r22(661));
        class o2 extends a2.default {
          constructor() {
            super(...arguments);
            this.serverCloseData = new u2();
          }
          static parse(t3) {
            let e3 = new o2();
            super.parseMsg(e3, t3);
            e3.serverCloseData = u2.parse(e3.data);
            return e3;
          }
          receive() {
            JSON.stringify(this.serverCloseData);
            let t3 = `server close ${this.serverCloseData.code}`;
            if (20 == this.serverCloseData.code || 23 == this.serverCloseData.code || 24 == this.serverCloseData.code) {
              n2.default.allowReconnect = false;
              n2.default.close(t3);
            } else if (21 == this.serverCloseData.code)
              this.safeClose21(t3);
            else {
              n2.default.allowReconnect = true;
              n2.default.close(t3);
              n2.default.reconnect(10);
            }
          }
          safeClose21(t3) {
            try {
              if ("undefined" != typeof document) {
                if (document.hasFocus() && "visible" == document.visibilityState) {
                  n2.default.allowReconnect = true;
                  n2.default.close(t3);
                  n2.default.reconnect(10);
                  return;
                }
              }
              n2.default.allowReconnect = false;
              n2.default.close(t3);
            } catch (e3) {
              s2.default.error(`ServerClose t1`, e3);
              n2.default.allowReconnect = false;
              n2.default.close(`${t3} error`);
            }
          }
        }
        class u2 {
          constructor() {
            this.code = -1;
            this.msg = "";
          }
          static parse(t3) {
            let e3 = new u2();
            let r3 = JSON.parse(t3);
            e3.code = r3.code;
            e3.msg = r3.msg;
            return e3;
          }
        }
        e22["default"] = o2;
      }, 910: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(8506));
        const s2 = i22(r22(9586));
        class a2 extends s2.default {
          constructor() {
            super(...arguments);
            this.addPhoneInfoResultData = new o2();
          }
          static parse(t3) {
            let e3 = new a2();
            super.parseActionMsg(e3, t3);
            e3.addPhoneInfoResultData = o2.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.addPhoneInfoResultData;
            let e3 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.addPhoneInfoResultData.errorCode, message: this.addPhoneInfoResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_ADD_PHONE_INFO_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class o2 {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new o2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e22["default"] = a2;
      }, 9538: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(8506));
        const s2 = i22(r22(529));
        const a2 = i22(r22(9586));
        class o2 extends a2.default {
          constructor() {
            super(...arguments);
            this.bindAliasResultData = new u2();
          }
          static parse(t3) {
            let e3 = new o2();
            super.parseActionMsg(e3, t3);
            e3.bindAliasResultData = u2.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            s2.default.info(`bind alias result`, this.bindAliasResultData);
            let e3 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.bindAliasResultData.errorCode, message: this.bindAliasResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class u2 {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new u2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e22["default"] = o2;
      }, 9479: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = r22(4198);
        const s2 = i22(r22(9586));
        class a2 extends s2.default {
          constructor() {
            super(...arguments);
            this.feedbackResultData = new o2();
          }
          static parse(t3) {
            let e3 = new a2();
            super.parseActionMsg(e3, t3);
            e3.feedbackResultData = o2.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.feedbackResultData;
            let e3 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
          }
        }
        class o2 {
          constructor() {
            this.actionId = "";
            this.taskId = "";
            this.result = "";
          }
          static parse(t3) {
            let e3 = new o2();
            let r3 = JSON.parse(t3);
            e3.actionId = r3.actionId;
            e3.taskId = r3.taskId;
            e3.result = r3.result;
            return e3;
          }
        }
        e22["default"] = a2;
      }, 6755: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2;
        Object.defineProperty(e22, "__esModule", { value: true });
        const s2 = i22(r22(6379));
        const a2 = i22(r22(9586));
        const o2 = i22(r22(8723));
        class u2 extends a2.default {
          constructor() {
            super(...arguments);
            this.pushMessageData = new c2();
          }
          static parse(t3) {
            let e3 = new u2();
            super.parseActionMsg(e3, t3);
            e3.pushMessageData = c2.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.pushMessageData;
            if (this.pushMessageData.appId != s2.default.appid || !this.pushMessageData.messageid || !this.pushMessageData.taskId)
              this.stringify();
            o2.default.create(this, o2.default.ActionId.RECEIVE).send();
            o2.default.create(this, o2.default.ActionId.MP_RECEIVE).send();
            if (this.actionMsgData.msgExtraData && s2.default.onPushMsg)
              null === (t3 = s2.default.onPushMsg) || void 0 === t3 || t3.call(s2.default.onPushMsg, { message: this.actionMsgData.msgExtraData });
          }
        }
        class c2 {
          constructor() {
            this.id = "";
            this.appKey = "";
            this.appId = "";
            this.messageid = "";
            this.taskId = "";
            this.actionChain = [];
            this.cdnType = "";
          }
          static parse(t3) {
            let e3 = new c2();
            let r3 = JSON.parse(t3);
            e3.id = r3.id;
            e3.appKey = r3.appKey;
            e3.appId = r3.appId;
            e3.messageid = r3.messageid;
            e3.taskId = r3.taskId;
            e3.actionChain = r3.actionChain;
            e3.cdnType = r3.cdnType;
            return e3;
          }
        }
        n2 = class {
        }, n2.GO_TO = "goto", n2.TRANSMIT = "transmit";
        e22["default"] = u2;
      }, 9510: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(9586));
        class s2 extends n2.default {
          constructor() {
            super(...arguments);
            this.setModeResultData = new a2();
          }
          static parse(t3) {
            let e3 = new s2();
            super.parseActionMsg(e3, t3);
            e3.setModeResultData = a2.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.setModeResultData;
            let e3 = n2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.setModeResultData.errorCode, message: this.setModeResultData.errorMsg });
          }
        }
        class a2 {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new a2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e22["default"] = s2;
      }, 4626: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(8506));
        const s2 = i22(r22(529));
        const a2 = i22(r22(9586));
        class o2 extends a2.default {
          constructor() {
            super(...arguments);
            this.setTagResultData = new u2();
          }
          static parse(t3) {
            let e3 = new o2();
            super.parseActionMsg(e3, t3);
            e3.setTagResultData = u2.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            s2.default.info(`set tag result`, this.setTagResultData);
            let e3 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.setTagResultData.errorCode, message: this.setTagResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_SET_TAG_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class u2 {
          constructor() {
            this.errorCode = 0;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new u2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e22["default"] = o2;
      }, 7562: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(8506));
        const s2 = i22(r22(529));
        const a2 = i22(r22(9586));
        class o2 extends a2.default {
          constructor() {
            super(...arguments);
            this.unbindAliasResultData = new u2();
          }
          static parse(t3) {
            let e3 = new o2();
            super.parseActionMsg(e3, t3);
            e3.unbindAliasResultData = u2.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            s2.default.info(`unbind alias result`, this.unbindAliasResultData);
            let e3 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.unbindAliasResultData.errorCode, message: this.unbindAliasResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class u2 {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new u2();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e22["default"] = o2;
      }, 8227: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          constructor(t3) {
            this.delay = 10;
            this.delay = t3;
          }
          start() {
            this.cancel();
            let t3 = this;
            this.timer = setInterval(function() {
              t3.run();
            }, this.delay);
          }
          cancel() {
            if (this.timer)
              clearInterval(this.timer);
          }
        }
        e22["default"] = r22;
      }, 7167: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2;
        Object.defineProperty(e22, "__esModule", { value: true });
        const s2 = i22(r22(6362));
        const a2 = i22(r22(8227));
        class o2 extends a2.default {
          static getInstance() {
            return o2.InstanceHolder.instance;
          }
          run() {
            s2.default.create().send();
          }
          refresh() {
            this.delay = 60 * 1e3;
            this.start();
          }
        }
        o2.INTERVAL = 60 * 1e3;
        o2.InstanceHolder = (n2 = class {
        }, n2.instance = new o2(o2.INTERVAL), n2);
        e22["default"] = o2;
      }, 2323: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(4736));
        const s2 = i22(r22(6667));
        var a2;
        (function(t3) {
          let e3 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          let r3 = (0, n2.default)("9223372036854775808");
          function i3(t4) {
            let e4 = a22(t4);
            let r4 = o2(e4);
            let i4 = r4[1];
            let n22 = r4[0];
            return u2(i4) + u2(n22);
          }
          t3.to_getui = i3;
          function a22(t4) {
            let e4 = s2.default.md5Hex(t4);
            let r4 = c2(e4);
            r4[6] &= 15;
            r4[6] |= 48;
            r4[8] &= 63;
            r4[8] |= 128;
            return r4;
          }
          function o2(t4) {
            let e4 = (0, n2.default)(0);
            let r4 = (0, n2.default)(0);
            for (let r5 = 0; r5 < 8; r5++)
              e4 = e4.multiply(256).plus((0, n2.default)(255 & t4[r5]));
            for (let e5 = 8; e5 < 16; e5++)
              r4 = r4.multiply(256).plus((0, n2.default)(255 & t4[e5]));
            return [e4, r4];
          }
          function u2(t4) {
            if (t4 >= r3)
              t4 = r3.multiply(2).minus(t4);
            let i4 = "";
            for (; t4 > (0, n2.default)(0); t4 = t4.divide(62))
              i4 += e3.charAt(Number(t4.divmod(62).remainder));
            return i4;
          }
          function c2(t4) {
            let e4 = t4.length;
            if (e4 % 2 != 0)
              return [];
            let r4 = new Array();
            for (let i4 = 0; i4 < e4; i4 += 2)
              r4.push(parseInt(t4.substring(i4, i4 + 2), 16));
            return r4;
          }
        })(a2 || (a2 = {}));
        e22["default"] = a2;
      }, 6667: function(t22, e22, r22) {
        var i22 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e22, "__esModule", { value: true });
        const n2 = i22(r22(2620));
        const s2 = i22(r22(1354));
        const a2 = i22(r22(6379));
        var o2;
        (function(t3) {
          let e3;
          let r3;
          let i3;
          let o22;
          let u2 = new n2.default();
          let c2 = s2.default.mode.CBC;
          let l2 = s2.default.pad.Pkcs7;
          let f2 = s2.default.AES;
          t3.algorithmMap = /* @__PURE__ */ new Map([["aes", s2.default.AES]]);
          t3.modeMap = /* @__PURE__ */ new Map([["cbc", s2.default.mode.CBC], ["cfb", s2.default.mode.CFB], ["cfb128", s2.default.mode.CFB], ["ecb", s2.default.mode.ECB], ["ofb", s2.default.mode.OFB]]);
          t3.paddingMap = /* @__PURE__ */ new Map([["nopadding", s2.default.pad.NoPadding], ["pkcs7", s2.default.pad.Pkcs7]]);
          function h2() {
            e3 = s2.default.MD5((/* @__PURE__ */ new Date()).getTime().toString());
            r3 = s2.default.MD5(e3);
            u2.setPublicKey(a2.default.publicKey);
            e3.toString(s2.default.enc.Hex);
            r3.toString(s2.default.enc.Hex);
            i3 = u2.encrypt(e3.toString(s2.default.enc.Hex));
            o22 = u2.encrypt(r3.toString(s2.default.enc.Hex));
          }
          t3.resetKey = h2;
          function d2(e4, r4, i4) {
            f2 = t3.algorithmMap.get(e4);
            c2 = t3.modeMap.get(r4);
            l2 = t3.paddingMap.get(i4);
          }
          t3.setEncryptParams = d2;
          function v2(t4) {
            return f2.encrypt(t4, e3, { iv: r3, mode: c2, padding: l2 }).toString();
          }
          t3.encrypt = v2;
          function p2(t4) {
            return f2.decrypt(t4, e3, { iv: r3, mode: c2, padding: l2 }).toString(s2.default.enc.Utf8);
          }
          t3.decrypt = p2;
          function g2(t4) {
            return s2.default.SHA256(t4).toString(s2.default.enc.Base64);
          }
          t3.sha256 = g2;
          function y2(t4) {
            return s2.default.MD5(t4).toString(s2.default.enc.Hex);
          }
          t3.md5Hex = y2;
          function m2() {
            return i3 ? i3 : "";
          }
          t3.getEncryptedSecretKey = m2;
          function w2() {
            return o22 ? o22 : "";
          }
          t3.getEncryptedIV = w2;
        })(o2 || (o2 = {}));
        e22["default"] = o2;
      }, 529: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          static info(...t3) {
            if (this.debugMode)
              console.info(`[GtPush]`, t3);
          }
          static warn(...t3) {
            console.warn(`[GtPush]`, t3);
          }
          static error(...t3) {
            console.error(`[GtPush]`, t3);
          }
        }
        r22.debugMode = false;
        e22["default"] = r22;
      }, 3854: (t22, e22) => {
        Object.defineProperty(e22, "__esModule", { value: true });
        class r22 {
          static getStr(t3, e3) {
            try {
              if (!t3 || void 0 === t3[e3])
                return "";
              return t3[e3];
            } catch (t4) {
            }
            return "";
          }
        }
        e22["default"] = r22;
      }, 2620: (t22, e22, r22) => {
        r22.r(e22);
        r22.d(e22, { JSEncrypt: () => wt2, default: () => St2 });
        var i22 = "0123456789abcdefghijklmnopqrstuvwxyz";
        function n2(t3) {
          return i22.charAt(t3);
        }
        function s2(t3, e3) {
          return t3 & e3;
        }
        function a2(t3, e3) {
          return t3 | e3;
        }
        function o2(t3, e3) {
          return t3 ^ e3;
        }
        function u2(t3, e3) {
          return t3 & ~e3;
        }
        function c2(t3) {
          if (0 == t3)
            return -1;
          var e3 = 0;
          if (0 == (65535 & t3)) {
            t3 >>= 16;
            e3 += 16;
          }
          if (0 == (255 & t3)) {
            t3 >>= 8;
            e3 += 8;
          }
          if (0 == (15 & t3)) {
            t3 >>= 4;
            e3 += 4;
          }
          if (0 == (3 & t3)) {
            t3 >>= 2;
            e3 += 2;
          }
          if (0 == (1 & t3))
            ++e3;
          return e3;
        }
        function l2(t3) {
          var e3 = 0;
          while (0 != t3) {
            t3 &= t3 - 1;
            ++e3;
          }
          return e3;
        }
        var f2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var h2 = "=";
        function d2(t3) {
          var e3;
          var r3;
          var i3 = "";
          for (e3 = 0; e3 + 3 <= t3.length; e3 += 3) {
            r3 = parseInt(t3.substring(e3, e3 + 3), 16);
            i3 += f2.charAt(r3 >> 6) + f2.charAt(63 & r3);
          }
          if (e3 + 1 == t3.length) {
            r3 = parseInt(t3.substring(e3, e3 + 1), 16);
            i3 += f2.charAt(r3 << 2);
          } else if (e3 + 2 == t3.length) {
            r3 = parseInt(t3.substring(e3, e3 + 2), 16);
            i3 += f2.charAt(r3 >> 2) + f2.charAt((3 & r3) << 4);
          }
          while ((3 & i3.length) > 0)
            i3 += h2;
          return i3;
        }
        function v2(t3) {
          var e3 = "";
          var r3;
          var i3 = 0;
          var s22 = 0;
          for (r3 = 0; r3 < t3.length; ++r3) {
            if (t3.charAt(r3) == h2)
              break;
            var a22 = f2.indexOf(t3.charAt(r3));
            if (a22 < 0)
              continue;
            if (0 == i3) {
              e3 += n2(a22 >> 2);
              s22 = 3 & a22;
              i3 = 1;
            } else if (1 == i3) {
              e3 += n2(s22 << 2 | a22 >> 4);
              s22 = 15 & a22;
              i3 = 2;
            } else if (2 == i3) {
              e3 += n2(s22);
              e3 += n2(a22 >> 2);
              s22 = 3 & a22;
              i3 = 3;
            } else {
              e3 += n2(s22 << 2 | a22 >> 4);
              e3 += n2(15 & a22);
              i3 = 0;
            }
          }
          if (1 == i3)
            e3 += n2(s22 << 2);
          return e3;
        }
        var g2;
        var y2 = { decode: function(t3) {
          var e3;
          if (void 0 === g2) {
            var r3 = "0123456789ABCDEF";
            var i3 = " \f\n\r	 \u2028\u2029";
            g2 = {};
            for (e3 = 0; e3 < 16; ++e3)
              g2[r3.charAt(e3)] = e3;
            r3 = r3.toLowerCase();
            for (e3 = 10; e3 < 16; ++e3)
              g2[r3.charAt(e3)] = e3;
            for (e3 = 0; e3 < i3.length; ++e3)
              g2[i3.charAt(e3)] = -1;
          }
          var n22 = [];
          var s22 = 0;
          var a22 = 0;
          for (e3 = 0; e3 < t3.length; ++e3) {
            var o22 = t3.charAt(e3);
            if ("=" == o22)
              break;
            o22 = g2[o22];
            if (-1 == o22)
              continue;
            if (void 0 === o22)
              throw new Error("Illegal character at offset " + e3);
            s22 |= o22;
            if (++a22 >= 2) {
              n22[n22.length] = s22;
              s22 = 0;
              a22 = 0;
            } else
              s22 <<= 4;
          }
          if (a22)
            throw new Error("Hex encoding incomplete: 4 bits missing");
          return n22;
        } };
        var m2;
        var w2 = { decode: function(t3) {
          var e3;
          if (void 0 === m2) {
            var r3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var i3 = "= \f\n\r	 \u2028\u2029";
            m2 = /* @__PURE__ */ Object.create(null);
            for (e3 = 0; e3 < 64; ++e3)
              m2[r3.charAt(e3)] = e3;
            m2["-"] = 62;
            m2["_"] = 63;
            for (e3 = 0; e3 < i3.length; ++e3)
              m2[i3.charAt(e3)] = -1;
          }
          var n22 = [];
          var s22 = 0;
          var a22 = 0;
          for (e3 = 0; e3 < t3.length; ++e3) {
            var o22 = t3.charAt(e3);
            if ("=" == o22)
              break;
            o22 = m2[o22];
            if (-1 == o22)
              continue;
            if (void 0 === o22)
              throw new Error("Illegal character at offset " + e3);
            s22 |= o22;
            if (++a22 >= 4) {
              n22[n22.length] = s22 >> 16;
              n22[n22.length] = s22 >> 8 & 255;
              n22[n22.length] = 255 & s22;
              s22 = 0;
              a22 = 0;
            } else
              s22 <<= 6;
          }
          switch (a22) {
            case 1:
              throw new Error("Base64 encoding incomplete: at least 2 bits missing");
            case 2:
              n22[n22.length] = s22 >> 10;
              break;
            case 3:
              n22[n22.length] = s22 >> 16;
              n22[n22.length] = s22 >> 8 & 255;
              break;
          }
          return n22;
        }, re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor: function(t3) {
          var e3 = w2.re.exec(t3);
          if (e3)
            if (e3[1])
              t3 = e3[1];
            else if (e3[2])
              t3 = e3[2];
            else
              throw new Error("RegExp out of sync");
          return w2.decode(t3);
        } };
        var S2 = 1e13;
        var _2 = function() {
          function t3(t4) {
            this.buf = [+t4 || 0];
          }
          t3.prototype.mulAdd = function(t4, e3) {
            var r3 = this.buf;
            var i3 = r3.length;
            var n22;
            var s22;
            for (n22 = 0; n22 < i3; ++n22) {
              s22 = r3[n22] * t4 + e3;
              if (s22 < S2)
                e3 = 0;
              else {
                e3 = 0 | s22 / S2;
                s22 -= e3 * S2;
              }
              r3[n22] = s22;
            }
            if (e3 > 0)
              r3[n22] = e3;
          };
          t3.prototype.sub = function(t4) {
            var e3 = this.buf;
            var r3 = e3.length;
            var i3;
            var n22;
            for (i3 = 0; i3 < r3; ++i3) {
              n22 = e3[i3] - t4;
              if (n22 < 0) {
                n22 += S2;
                t4 = 1;
              } else
                t4 = 0;
              e3[i3] = n22;
            }
            while (0 === e3[e3.length - 1])
              e3.pop();
          };
          t3.prototype.toString = function(t4) {
            if (10 != (t4 || 10))
              throw new Error("only base 10 is supported");
            var e3 = this.buf;
            var r3 = e3[e3.length - 1].toString();
            for (var i3 = e3.length - 2; i3 >= 0; --i3)
              r3 += (S2 + e3[i3]).toString().substring(1);
            return r3;
          };
          t3.prototype.valueOf = function() {
            var t4 = this.buf;
            var e3 = 0;
            for (var r3 = t4.length - 1; r3 >= 0; --r3)
              e3 = e3 * S2 + t4[r3];
            return e3;
          };
          t3.prototype.simplify = function() {
            var t4 = this.buf;
            return 1 == t4.length ? t4[0] : this;
          };
          return t3;
        }();
        var b2 = "…";
        var E2 = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        var D2 = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        function M2(t3, e3) {
          if (t3.length > e3)
            t3 = t3.substring(0, e3) + b2;
          return t3;
        }
        var T2 = function() {
          function t3(e3, r3) {
            this.hexDigits = "0123456789ABCDEF";
            if (e3 instanceof t3) {
              this.enc = e3.enc;
              this.pos = e3.pos;
            } else {
              this.enc = e3;
              this.pos = r3;
            }
          }
          t3.prototype.get = function(t4) {
            if (void 0 === t4)
              t4 = this.pos++;
            if (t4 >= this.enc.length)
              throw new Error("Requesting byte offset " + t4 + " on a stream of length " + this.enc.length);
            return "string" === typeof this.enc ? this.enc.charCodeAt(t4) : this.enc[t4];
          };
          t3.prototype.hexByte = function(t4) {
            return this.hexDigits.charAt(t4 >> 4 & 15) + this.hexDigits.charAt(15 & t4);
          };
          t3.prototype.hexDump = function(t4, e3, r3) {
            var i3 = "";
            for (var n22 = t4; n22 < e3; ++n22) {
              i3 += this.hexByte(this.get(n22));
              if (true !== r3)
                switch (15 & n22) {
                  case 7:
                    i3 += "  ";
                    break;
                  case 15:
                    i3 += "\n";
                    break;
                  default:
                    i3 += " ";
                }
            }
            return i3;
          };
          t3.prototype.isASCII = function(t4, e3) {
            for (var r3 = t4; r3 < e3; ++r3) {
              var i3 = this.get(r3);
              if (i3 < 32 || i3 > 176)
                return false;
            }
            return true;
          };
          t3.prototype.parseStringISO = function(t4, e3) {
            var r3 = "";
            for (var i3 = t4; i3 < e3; ++i3)
              r3 += String.fromCharCode(this.get(i3));
            return r3;
          };
          t3.prototype.parseStringUTF = function(t4, e3) {
            var r3 = "";
            for (var i3 = t4; i3 < e3; ) {
              var n22 = this.get(i3++);
              if (n22 < 128)
                r3 += String.fromCharCode(n22);
              else if (n22 > 191 && n22 < 224)
                r3 += String.fromCharCode((31 & n22) << 6 | 63 & this.get(i3++));
              else
                r3 += String.fromCharCode((15 & n22) << 12 | (63 & this.get(i3++)) << 6 | 63 & this.get(i3++));
            }
            return r3;
          };
          t3.prototype.parseStringBMP = function(t4, e3) {
            var r3 = "";
            var i3;
            var n22;
            for (var s22 = t4; s22 < e3; ) {
              i3 = this.get(s22++);
              n22 = this.get(s22++);
              r3 += String.fromCharCode(i3 << 8 | n22);
            }
            return r3;
          };
          t3.prototype.parseTime = function(t4, e3, r3) {
            var i3 = this.parseStringISO(t4, e3);
            var n22 = (r3 ? E2 : D2).exec(i3);
            if (!n22)
              return "Unrecognized time: " + i3;
            if (r3) {
              n22[1] = +n22[1];
              n22[1] += +n22[1] < 70 ? 2e3 : 1900;
            }
            i3 = n22[1] + "-" + n22[2] + "-" + n22[3] + " " + n22[4];
            if (n22[5]) {
              i3 += ":" + n22[5];
              if (n22[6]) {
                i3 += ":" + n22[6];
                if (n22[7])
                  i3 += "." + n22[7];
              }
            }
            if (n22[8]) {
              i3 += " UTC";
              if ("Z" != n22[8]) {
                i3 += n22[8];
                if (n22[9])
                  i3 += ":" + n22[9];
              }
            }
            return i3;
          };
          t3.prototype.parseInteger = function(t4, e3) {
            var r3 = this.get(t4);
            var i3 = r3 > 127;
            var n22 = i3 ? 255 : 0;
            var s22;
            var a22 = "";
            while (r3 == n22 && ++t4 < e3)
              r3 = this.get(t4);
            s22 = e3 - t4;
            if (0 === s22)
              return i3 ? -1 : 0;
            if (s22 > 4) {
              a22 = r3;
              s22 <<= 3;
              while (0 == (128 & (+a22 ^ n22))) {
                a22 = +a22 << 1;
                --s22;
              }
              a22 = "(" + s22 + " bit)\n";
            }
            if (i3)
              r3 -= 256;
            var o22 = new _2(r3);
            for (var u22 = t4 + 1; u22 < e3; ++u22)
              o22.mulAdd(256, this.get(u22));
            return a22 + o22.toString();
          };
          t3.prototype.parseBitString = function(t4, e3, r3) {
            var i3 = this.get(t4);
            var n22 = (e3 - t4 - 1 << 3) - i3;
            var s22 = "(" + n22 + " bit)\n";
            var a22 = "";
            for (var o22 = t4 + 1; o22 < e3; ++o22) {
              var u22 = this.get(o22);
              var c22 = o22 == e3 - 1 ? i3 : 0;
              for (var l22 = 7; l22 >= c22; --l22)
                a22 += u22 >> l22 & 1 ? "1" : "0";
              if (a22.length > r3)
                return s22 + M2(a22, r3);
            }
            return s22 + a22;
          };
          t3.prototype.parseOctetString = function(t4, e3, r3) {
            if (this.isASCII(t4, e3))
              return M2(this.parseStringISO(t4, e3), r3);
            var i3 = e3 - t4;
            var n22 = "(" + i3 + " byte)\n";
            r3 /= 2;
            if (i3 > r3)
              e3 = t4 + r3;
            for (var s22 = t4; s22 < e3; ++s22)
              n22 += this.hexByte(this.get(s22));
            if (i3 > r3)
              n22 += b2;
            return n22;
          };
          t3.prototype.parseOID = function(t4, e3, r3) {
            var i3 = "";
            var n22 = new _2();
            var s22 = 0;
            for (var a22 = t4; a22 < e3; ++a22) {
              var o22 = this.get(a22);
              n22.mulAdd(128, 127 & o22);
              s22 += 7;
              if (!(128 & o22)) {
                if ("" === i3) {
                  n22 = n22.simplify();
                  if (n22 instanceof _2) {
                    n22.sub(80);
                    i3 = "2." + n22.toString();
                  } else {
                    var u22 = n22 < 80 ? n22 < 40 ? 0 : 1 : 2;
                    i3 = u22 + "." + (n22 - 40 * u22);
                  }
                } else
                  i3 += "." + n22.toString();
                if (i3.length > r3)
                  return M2(i3, r3);
                n22 = new _2();
                s22 = 0;
              }
            }
            if (s22 > 0)
              i3 += ".incomplete";
            return i3;
          };
          return t3;
        }();
        var I2 = function() {
          function t3(t4, e3, r3, i3, n22) {
            if (!(i3 instanceof A2))
              throw new Error("Invalid tag value.");
            this.stream = t4;
            this.header = e3;
            this.length = r3;
            this.tag = i3;
            this.sub = n22;
          }
          t3.prototype.typeName = function() {
            switch (this.tag.tagClass) {
              case 0:
                switch (this.tag.tagNumber) {
                  case 0:
                    return "EOC";
                  case 1:
                    return "BOOLEAN";
                  case 2:
                    return "INTEGER";
                  case 3:
                    return "BIT_STRING";
                  case 4:
                    return "OCTET_STRING";
                  case 5:
                    return "NULL";
                  case 6:
                    return "OBJECT_IDENTIFIER";
                  case 7:
                    return "ObjectDescriptor";
                  case 8:
                    return "EXTERNAL";
                  case 9:
                    return "REAL";
                  case 10:
                    return "ENUMERATED";
                  case 11:
                    return "EMBEDDED_PDV";
                  case 12:
                    return "UTF8String";
                  case 16:
                    return "SEQUENCE";
                  case 17:
                    return "SET";
                  case 18:
                    return "NumericString";
                  case 19:
                    return "PrintableString";
                  case 20:
                    return "TeletexString";
                  case 21:
                    return "VideotexString";
                  case 22:
                    return "IA5String";
                  case 23:
                    return "UTCTime";
                  case 24:
                    return "GeneralizedTime";
                  case 25:
                    return "GraphicString";
                  case 26:
                    return "VisibleString";
                  case 27:
                    return "GeneralString";
                  case 28:
                    return "UniversalString";
                  case 30:
                    return "BMPString";
                }
                return "Universal_" + this.tag.tagNumber.toString();
              case 1:
                return "Application_" + this.tag.tagNumber.toString();
              case 2:
                return "[" + this.tag.tagNumber.toString() + "]";
              case 3:
                return "Private_" + this.tag.tagNumber.toString();
            }
          };
          t3.prototype.content = function(t4) {
            if (void 0 === this.tag)
              return null;
            if (void 0 === t4)
              t4 = 1 / 0;
            var e3 = this.posContent();
            var r3 = Math.abs(this.length);
            if (!this.tag.isUniversal()) {
              if (null !== this.sub)
                return "(" + this.sub.length + " elem)";
              return this.stream.parseOctetString(e3, e3 + r3, t4);
            }
            switch (this.tag.tagNumber) {
              case 1:
                return 0 === this.stream.get(e3) ? "false" : "true";
              case 2:
                return this.stream.parseInteger(e3, e3 + r3);
              case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e3, e3 + r3, t4);
              case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e3, e3 + r3, t4);
              case 6:
                return this.stream.parseOID(e3, e3 + r3, t4);
              case 16:
              case 17:
                if (null !== this.sub)
                  return "(" + this.sub.length + " elem)";
                else
                  return "(no elem)";
              case 12:
                return M2(this.stream.parseStringUTF(e3, e3 + r3), t4);
              case 18:
              case 19:
              case 20:
              case 21:
              case 22:
              case 26:
                return M2(this.stream.parseStringISO(e3, e3 + r3), t4);
              case 30:
                return M2(this.stream.parseStringBMP(e3, e3 + r3), t4);
              case 23:
              case 24:
                return this.stream.parseTime(e3, e3 + r3, 23 == this.tag.tagNumber);
            }
            return null;
          };
          t3.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";
          };
          t3.prototype.toPrettyString = function(t4) {
            if (void 0 === t4)
              t4 = "";
            var e3 = t4 + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0)
              e3 += "+";
            e3 += this.length;
            if (this.tag.tagConstructed)
              e3 += " (constructed)";
            else if (this.tag.isUniversal() && (3 == this.tag.tagNumber || 4 == this.tag.tagNumber) && null !== this.sub)
              e3 += " (encapsulates)";
            e3 += "\n";
            if (null !== this.sub) {
              t4 += "  ";
              for (var r3 = 0, i3 = this.sub.length; r3 < i3; ++r3)
                e3 += this.sub[r3].toPrettyString(t4);
            }
            return e3;
          };
          t3.prototype.posStart = function() {
            return this.stream.pos;
          };
          t3.prototype.posContent = function() {
            return this.stream.pos + this.header;
          };
          t3.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length);
          };
          t3.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true);
          };
          t3.decodeLength = function(t4) {
            var e3 = t4.get();
            var r3 = 127 & e3;
            if (r3 == e3)
              return r3;
            if (r3 > 6)
              throw new Error("Length over 48 bits not supported at position " + (t4.pos - 1));
            if (0 === r3)
              return null;
            e3 = 0;
            for (var i3 = 0; i3 < r3; ++i3)
              e3 = 256 * e3 + t4.get();
            return e3;
          };
          t3.prototype.getHexStringValue = function() {
            var t4 = this.toHexString();
            var e3 = 2 * this.header;
            var r3 = 2 * this.length;
            return t4.substr(e3, r3);
          };
          t3.decode = function(e3) {
            var r3;
            if (!(e3 instanceof T2))
              r3 = new T2(e3, 0);
            else
              r3 = e3;
            var i3 = new T2(r3);
            var n22 = new A2(r3);
            var s22 = t3.decodeLength(r3);
            var a22 = r3.pos;
            var o22 = a22 - i3.pos;
            var u22 = null;
            var c22 = function() {
              var e4 = [];
              if (null !== s22) {
                var i4 = a22 + s22;
                while (r3.pos < i4)
                  e4[e4.length] = t3.decode(r3);
                if (r3.pos != i4)
                  throw new Error("Content size is not correct for container starting at offset " + a22);
              } else
                try {
                  for (; ; ) {
                    var n3 = t3.decode(r3);
                    if (n3.tag.isEOC())
                      break;
                    e4[e4.length] = n3;
                  }
                  s22 = a22 - r3.pos;
                } catch (t4) {
                  throw new Error("Exception while decoding undefined length content: " + t4);
                }
              return e4;
            };
            if (n22.tagConstructed)
              u22 = c22();
            else if (n22.isUniversal() && (3 == n22.tagNumber || 4 == n22.tagNumber))
              try {
                if (3 == n22.tagNumber) {
                  if (0 != r3.get())
                    throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                }
                u22 = c22();
                for (var l22 = 0; l22 < u22.length; ++l22)
                  if (u22[l22].tag.isEOC())
                    throw new Error("EOC is not supposed to be actual content.");
              } catch (t4) {
                u22 = null;
              }
            if (null === u22) {
              if (null === s22)
                throw new Error("We can't skip over an invalid tag with undefined length at offset " + a22);
              r3.pos = a22 + Math.abs(s22);
            }
            return new t3(i3, o22, s22, n22, u22);
          };
          return t3;
        }();
        var A2 = function() {
          function t3(t4) {
            var e3 = t4.get();
            this.tagClass = e3 >> 6;
            this.tagConstructed = 0 !== (32 & e3);
            this.tagNumber = 31 & e3;
            if (31 == this.tagNumber) {
              var r3 = new _2();
              do {
                e3 = t4.get();
                r3.mulAdd(128, 127 & e3);
              } while (128 & e3);
              this.tagNumber = r3.simplify();
            }
          }
          t3.prototype.isUniversal = function() {
            return 0 === this.tagClass;
          };
          t3.prototype.isEOC = function() {
            return 0 === this.tagClass && 0 === this.tagNumber;
          };
          return t3;
        }();
        var x;
        var R2 = 244837814094590;
        var B2 = 15715070 == (16777215 & R2);
        var O2 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
        var k = (1 << 26) / O2[O2.length - 1];
        var C2 = function() {
          function t3(t4, e3, r3) {
            if (null != t4)
              if ("number" == typeof t4)
                this.fromNumber(t4, e3, r3);
              else if (null == e3 && "string" != typeof t4)
                this.fromString(t4, 256);
              else
                this.fromString(t4, e3);
          }
          t3.prototype.toString = function(t4) {
            if (this.s < 0)
              return "-" + this.negate().toString(t4);
            var e3;
            if (16 == t4)
              e3 = 4;
            else if (8 == t4)
              e3 = 3;
            else if (2 == t4)
              e3 = 1;
            else if (32 == t4)
              e3 = 5;
            else if (4 == t4)
              e3 = 2;
            else
              return this.toRadix(t4);
            var r3 = (1 << e3) - 1;
            var i3;
            var s22 = false;
            var a22 = "";
            var o22 = this.t;
            var u22 = this.DB - o22 * this.DB % e3;
            if (o22-- > 0) {
              if (u22 < this.DB && (i3 = this[o22] >> u22) > 0) {
                s22 = true;
                a22 = n2(i3);
              }
              while (o22 >= 0) {
                if (u22 < e3) {
                  i3 = (this[o22] & (1 << u22) - 1) << e3 - u22;
                  i3 |= this[--o22] >> (u22 += this.DB - e3);
                } else {
                  i3 = this[o22] >> (u22 -= e3) & r3;
                  if (u22 <= 0) {
                    u22 += this.DB;
                    --o22;
                  }
                }
                if (i3 > 0)
                  s22 = true;
                if (s22)
                  a22 += n2(i3);
              }
            }
            return s22 ? a22 : "0";
          };
          t3.prototype.negate = function() {
            var e3 = H2();
            t3.ZERO.subTo(this, e3);
            return e3;
          };
          t3.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this;
          };
          t3.prototype.compareTo = function(t4) {
            var e3 = this.s - t4.s;
            if (0 != e3)
              return e3;
            var r3 = this.t;
            e3 = r3 - t4.t;
            if (0 != e3)
              return this.s < 0 ? -e3 : e3;
            while (--r3 >= 0)
              if (0 != (e3 = this[r3] - t4[r3]))
                return e3;
            return 0;
          };
          t3.prototype.bitLength = function() {
            if (this.t <= 0)
              return 0;
            return this.DB * (this.t - 1) + W2(this[this.t - 1] ^ this.s & this.DM);
          };
          t3.prototype.mod = function(e3) {
            var r3 = H2();
            this.abs().divRemTo(e3, null, r3);
            if (this.s < 0 && r3.compareTo(t3.ZERO) > 0)
              e3.subTo(r3, r3);
            return r3;
          };
          t3.prototype.modPowInt = function(t4, e3) {
            var r3;
            if (t4 < 256 || e3.isEven())
              r3 = new P2(e3);
            else
              r3 = new V2(e3);
            return this.exp(t4, r3);
          };
          t3.prototype.clone = function() {
            var t4 = H2();
            this.copyTo(t4);
            return t4;
          };
          t3.prototype.intValue = function() {
            if (this.s < 0) {
              if (1 == this.t)
                return this[0] - this.DV;
              else if (0 == this.t)
                return -1;
            } else if (1 == this.t)
              return this[0];
            else if (0 == this.t)
              return 0;
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
          };
          t3.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24;
          };
          t3.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16;
          };
          t3.prototype.signum = function() {
            if (this.s < 0)
              return -1;
            else if (this.t <= 0 || 1 == this.t && this[0] <= 0)
              return 0;
            else
              return 1;
          };
          t3.prototype.toByteArray = function() {
            var t4 = this.t;
            var e3 = [];
            e3[0] = this.s;
            var r3 = this.DB - t4 * this.DB % 8;
            var i3;
            var n22 = 0;
            if (t4-- > 0) {
              if (r3 < this.DB && (i3 = this[t4] >> r3) != (this.s & this.DM) >> r3)
                e3[n22++] = i3 | this.s << this.DB - r3;
              while (t4 >= 0) {
                if (r3 < 8) {
                  i3 = (this[t4] & (1 << r3) - 1) << 8 - r3;
                  i3 |= this[--t4] >> (r3 += this.DB - 8);
                } else {
                  i3 = this[t4] >> (r3 -= 8) & 255;
                  if (r3 <= 0) {
                    r3 += this.DB;
                    --t4;
                  }
                }
                if (0 != (128 & i3))
                  i3 |= -256;
                if (0 == n22 && (128 & this.s) != (128 & i3))
                  ++n22;
                if (n22 > 0 || i3 != this.s)
                  e3[n22++] = i3;
              }
            }
            return e3;
          };
          t3.prototype.equals = function(t4) {
            return 0 == this.compareTo(t4);
          };
          t3.prototype.min = function(t4) {
            return this.compareTo(t4) < 0 ? this : t4;
          };
          t3.prototype.max = function(t4) {
            return this.compareTo(t4) > 0 ? this : t4;
          };
          t3.prototype.and = function(t4) {
            var e3 = H2();
            this.bitwiseTo(t4, s2, e3);
            return e3;
          };
          t3.prototype.or = function(t4) {
            var e3 = H2();
            this.bitwiseTo(t4, a2, e3);
            return e3;
          };
          t3.prototype.xor = function(t4) {
            var e3 = H2();
            this.bitwiseTo(t4, o2, e3);
            return e3;
          };
          t3.prototype.andNot = function(t4) {
            var e3 = H2();
            this.bitwiseTo(t4, u2, e3);
            return e3;
          };
          t3.prototype.not = function() {
            var t4 = H2();
            for (var e3 = 0; e3 < this.t; ++e3)
              t4[e3] = this.DM & ~this[e3];
            t4.t = this.t;
            t4.s = ~this.s;
            return t4;
          };
          t3.prototype.shiftLeft = function(t4) {
            var e3 = H2();
            if (t4 < 0)
              this.rShiftTo(-t4, e3);
            else
              this.lShiftTo(t4, e3);
            return e3;
          };
          t3.prototype.shiftRight = function(t4) {
            var e3 = H2();
            if (t4 < 0)
              this.lShiftTo(-t4, e3);
            else
              this.rShiftTo(t4, e3);
            return e3;
          };
          t3.prototype.getLowestSetBit = function() {
            for (var t4 = 0; t4 < this.t; ++t4)
              if (0 != this[t4])
                return t4 * this.DB + c2(this[t4]);
            if (this.s < 0)
              return this.t * this.DB;
            return -1;
          };
          t3.prototype.bitCount = function() {
            var t4 = 0;
            var e3 = this.s & this.DM;
            for (var r3 = 0; r3 < this.t; ++r3)
              t4 += l2(this[r3] ^ e3);
            return t4;
          };
          t3.prototype.testBit = function(t4) {
            var e3 = Math.floor(t4 / this.DB);
            if (e3 >= this.t)
              return 0 != this.s;
            return 0 != (this[e3] & 1 << t4 % this.DB);
          };
          t3.prototype.setBit = function(t4) {
            return this.changeBit(t4, a2);
          };
          t3.prototype.clearBit = function(t4) {
            return this.changeBit(t4, u2);
          };
          t3.prototype.flipBit = function(t4) {
            return this.changeBit(t4, o2);
          };
          t3.prototype.add = function(t4) {
            var e3 = H2();
            this.addTo(t4, e3);
            return e3;
          };
          t3.prototype.subtract = function(t4) {
            var e3 = H2();
            this.subTo(t4, e3);
            return e3;
          };
          t3.prototype.multiply = function(t4) {
            var e3 = H2();
            this.multiplyTo(t4, e3);
            return e3;
          };
          t3.prototype.divide = function(t4) {
            var e3 = H2();
            this.divRemTo(t4, e3, null);
            return e3;
          };
          t3.prototype.remainder = function(t4) {
            var e3 = H2();
            this.divRemTo(t4, null, e3);
            return e3;
          };
          t3.prototype.divideAndRemainder = function(t4) {
            var e3 = H2();
            var r3 = H2();
            this.divRemTo(t4, e3, r3);
            return [e3, r3];
          };
          t3.prototype.modPow = function(t4, e3) {
            var r3 = t4.bitLength();
            var i3;
            var n22 = Y2(1);
            var s22;
            if (r3 <= 0)
              return n22;
            else if (r3 < 18)
              i3 = 1;
            else if (r3 < 48)
              i3 = 3;
            else if (r3 < 144)
              i3 = 4;
            else if (r3 < 768)
              i3 = 5;
            else
              i3 = 6;
            if (r3 < 8)
              s22 = new P2(e3);
            else if (e3.isEven())
              s22 = new L2(e3);
            else
              s22 = new V2(e3);
            var a22 = [];
            var o22 = 3;
            var u22 = i3 - 1;
            var c22 = (1 << i3) - 1;
            a22[1] = s22.convert(this);
            if (i3 > 1) {
              var l22 = H2();
              s22.sqrTo(a22[1], l22);
              while (o22 <= c22) {
                a22[o22] = H2();
                s22.mulTo(l22, a22[o22 - 2], a22[o22]);
                o22 += 2;
              }
            }
            var f22 = t4.t - 1;
            var h22;
            var d22 = true;
            var v22 = H2();
            var p2;
            r3 = W2(t4[f22]) - 1;
            while (f22 >= 0) {
              if (r3 >= u22)
                h22 = t4[f22] >> r3 - u22 & c22;
              else {
                h22 = (t4[f22] & (1 << r3 + 1) - 1) << u22 - r3;
                if (f22 > 0)
                  h22 |= t4[f22 - 1] >> this.DB + r3 - u22;
              }
              o22 = i3;
              while (0 == (1 & h22)) {
                h22 >>= 1;
                --o22;
              }
              if ((r3 -= o22) < 0) {
                r3 += this.DB;
                --f22;
              }
              if (d22) {
                a22[h22].copyTo(n22);
                d22 = false;
              } else {
                while (o22 > 1) {
                  s22.sqrTo(n22, v22);
                  s22.sqrTo(v22, n22);
                  o22 -= 2;
                }
                if (o22 > 0)
                  s22.sqrTo(n22, v22);
                else {
                  p2 = n22;
                  n22 = v22;
                  v22 = p2;
                }
                s22.mulTo(v22, a22[h22], n22);
              }
              while (f22 >= 0 && 0 == (t4[f22] & 1 << r3)) {
                s22.sqrTo(n22, v22);
                p2 = n22;
                n22 = v22;
                v22 = p2;
                if (--r3 < 0) {
                  r3 = this.DB - 1;
                  --f22;
                }
              }
            }
            return s22.revert(n22);
          };
          t3.prototype.modInverse = function(e3) {
            var r3 = e3.isEven();
            if (this.isEven() && r3 || 0 == e3.signum())
              return t3.ZERO;
            var i3 = e3.clone();
            var n22 = this.clone();
            var s22 = Y2(1);
            var a22 = Y2(0);
            var o22 = Y2(0);
            var u22 = Y2(1);
            while (0 != i3.signum()) {
              while (i3.isEven()) {
                i3.rShiftTo(1, i3);
                if (r3) {
                  if (!s22.isEven() || !a22.isEven()) {
                    s22.addTo(this, s22);
                    a22.subTo(e3, a22);
                  }
                  s22.rShiftTo(1, s22);
                } else if (!a22.isEven())
                  a22.subTo(e3, a22);
                a22.rShiftTo(1, a22);
              }
              while (n22.isEven()) {
                n22.rShiftTo(1, n22);
                if (r3) {
                  if (!o22.isEven() || !u22.isEven()) {
                    o22.addTo(this, o22);
                    u22.subTo(e3, u22);
                  }
                  o22.rShiftTo(1, o22);
                } else if (!u22.isEven())
                  u22.subTo(e3, u22);
                u22.rShiftTo(1, u22);
              }
              if (i3.compareTo(n22) >= 0) {
                i3.subTo(n22, i3);
                if (r3)
                  s22.subTo(o22, s22);
                a22.subTo(u22, a22);
              } else {
                n22.subTo(i3, n22);
                if (r3)
                  o22.subTo(s22, o22);
                u22.subTo(a22, u22);
              }
            }
            if (0 != n22.compareTo(t3.ONE))
              return t3.ZERO;
            if (u22.compareTo(e3) >= 0)
              return u22.subtract(e3);
            if (u22.signum() < 0)
              u22.addTo(e3, u22);
            else
              return u22;
            if (u22.signum() < 0)
              return u22.add(e3);
            else
              return u22;
          };
          t3.prototype.pow = function(t4) {
            return this.exp(t4, new N2());
          };
          t3.prototype.gcd = function(t4) {
            var e3 = this.s < 0 ? this.negate() : this.clone();
            var r3 = t4.s < 0 ? t4.negate() : t4.clone();
            if (e3.compareTo(r3) < 0) {
              var i3 = e3;
              e3 = r3;
              r3 = i3;
            }
            var n22 = e3.getLowestSetBit();
            var s22 = r3.getLowestSetBit();
            if (s22 < 0)
              return e3;
            if (n22 < s22)
              s22 = n22;
            if (s22 > 0) {
              e3.rShiftTo(s22, e3);
              r3.rShiftTo(s22, r3);
            }
            while (e3.signum() > 0) {
              if ((n22 = e3.getLowestSetBit()) > 0)
                e3.rShiftTo(n22, e3);
              if ((n22 = r3.getLowestSetBit()) > 0)
                r3.rShiftTo(n22, r3);
              if (e3.compareTo(r3) >= 0) {
                e3.subTo(r3, e3);
                e3.rShiftTo(1, e3);
              } else {
                r3.subTo(e3, r3);
                r3.rShiftTo(1, r3);
              }
            }
            if (s22 > 0)
              r3.lShiftTo(s22, r3);
            return r3;
          };
          t3.prototype.isProbablePrime = function(t4) {
            var e3;
            var r3 = this.abs();
            if (1 == r3.t && r3[0] <= O2[O2.length - 1]) {
              for (e3 = 0; e3 < O2.length; ++e3)
                if (r3[0] == O2[e3])
                  return true;
              return false;
            }
            if (r3.isEven())
              return false;
            e3 = 1;
            while (e3 < O2.length) {
              var i3 = O2[e3];
              var n22 = e3 + 1;
              while (n22 < O2.length && i3 < k)
                i3 *= O2[n22++];
              i3 = r3.modInt(i3);
              while (e3 < n22)
                if (i3 % O2[e3++] == 0)
                  return false;
            }
            return r3.millerRabin(t4);
          };
          t3.prototype.copyTo = function(t4) {
            for (var e3 = this.t - 1; e3 >= 0; --e3)
              t4[e3] = this[e3];
            t4.t = this.t;
            t4.s = this.s;
          };
          t3.prototype.fromInt = function(t4) {
            this.t = 1;
            this.s = t4 < 0 ? -1 : 0;
            if (t4 > 0)
              this[0] = t4;
            else if (t4 < -1)
              this[0] = t4 + this.DV;
            else
              this.t = 0;
          };
          t3.prototype.fromString = function(e3, r3) {
            var i3;
            if (16 == r3)
              i3 = 4;
            else if (8 == r3)
              i3 = 3;
            else if (256 == r3)
              i3 = 8;
            else if (2 == r3)
              i3 = 1;
            else if (32 == r3)
              i3 = 5;
            else if (4 == r3)
              i3 = 2;
            else {
              this.fromRadix(e3, r3);
              return;
            }
            this.t = 0;
            this.s = 0;
            var n22 = e3.length;
            var s22 = false;
            var a22 = 0;
            while (--n22 >= 0) {
              var o22 = 8 == i3 ? 255 & +e3[n22] : G2(e3, n22);
              if (o22 < 0) {
                if ("-" == e3.charAt(n22))
                  s22 = true;
                continue;
              }
              s22 = false;
              if (0 == a22)
                this[this.t++] = o22;
              else if (a22 + i3 > this.DB) {
                this[this.t - 1] |= (o22 & (1 << this.DB - a22) - 1) << a22;
                this[this.t++] = o22 >> this.DB - a22;
              } else
                this[this.t - 1] |= o22 << a22;
              a22 += i3;
              if (a22 >= this.DB)
                a22 -= this.DB;
            }
            if (8 == i3 && 0 != (128 & +e3[0])) {
              this.s = -1;
              if (a22 > 0)
                this[this.t - 1] |= (1 << this.DB - a22) - 1 << a22;
            }
            this.clamp();
            if (s22)
              t3.ZERO.subTo(this, this);
          };
          t3.prototype.clamp = function() {
            var t4 = this.s & this.DM;
            while (this.t > 0 && this[this.t - 1] == t4)
              --this.t;
          };
          t3.prototype.dlShiftTo = function(t4, e3) {
            var r3;
            for (r3 = this.t - 1; r3 >= 0; --r3)
              e3[r3 + t4] = this[r3];
            for (r3 = t4 - 1; r3 >= 0; --r3)
              e3[r3] = 0;
            e3.t = this.t + t4;
            e3.s = this.s;
          };
          t3.prototype.drShiftTo = function(t4, e3) {
            for (var r3 = t4; r3 < this.t; ++r3)
              e3[r3 - t4] = this[r3];
            e3.t = Math.max(this.t - t4, 0);
            e3.s = this.s;
          };
          t3.prototype.lShiftTo = function(t4, e3) {
            var r3 = t4 % this.DB;
            var i3 = this.DB - r3;
            var n22 = (1 << i3) - 1;
            var s22 = Math.floor(t4 / this.DB);
            var a22 = this.s << r3 & this.DM;
            for (var o22 = this.t - 1; o22 >= 0; --o22) {
              e3[o22 + s22 + 1] = this[o22] >> i3 | a22;
              a22 = (this[o22] & n22) << r3;
            }
            for (var o22 = s22 - 1; o22 >= 0; --o22)
              e3[o22] = 0;
            e3[s22] = a22;
            e3.t = this.t + s22 + 1;
            e3.s = this.s;
            e3.clamp();
          };
          t3.prototype.rShiftTo = function(t4, e3) {
            e3.s = this.s;
            var r3 = Math.floor(t4 / this.DB);
            if (r3 >= this.t) {
              e3.t = 0;
              return;
            }
            var i3 = t4 % this.DB;
            var n22 = this.DB - i3;
            var s22 = (1 << i3) - 1;
            e3[0] = this[r3] >> i3;
            for (var a22 = r3 + 1; a22 < this.t; ++a22) {
              e3[a22 - r3 - 1] |= (this[a22] & s22) << n22;
              e3[a22 - r3] = this[a22] >> i3;
            }
            if (i3 > 0)
              e3[this.t - r3 - 1] |= (this.s & s22) << n22;
            e3.t = this.t - r3;
            e3.clamp();
          };
          t3.prototype.subTo = function(t4, e3) {
            var r3 = 0;
            var i3 = 0;
            var n22 = Math.min(t4.t, this.t);
            while (r3 < n22) {
              i3 += this[r3] - t4[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            if (t4.t < this.t) {
              i3 -= t4.s;
              while (r3 < this.t) {
                i3 += this[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 += this.s;
            } else {
              i3 += this.s;
              while (r3 < t4.t) {
                i3 -= t4[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 -= t4.s;
            }
            e3.s = i3 < 0 ? -1 : 0;
            if (i3 < -1)
              e3[r3++] = this.DV + i3;
            else if (i3 > 0)
              e3[r3++] = i3;
            e3.t = r3;
            e3.clamp();
          };
          t3.prototype.multiplyTo = function(e3, r3) {
            var i3 = this.abs();
            var n22 = e3.abs();
            var s22 = i3.t;
            r3.t = s22 + n22.t;
            while (--s22 >= 0)
              r3[s22] = 0;
            for (s22 = 0; s22 < n22.t; ++s22)
              r3[s22 + i3.t] = i3.am(0, n22[s22], r3, s22, 0, i3.t);
            r3.s = 0;
            r3.clamp();
            if (this.s != e3.s)
              t3.ZERO.subTo(r3, r3);
          };
          t3.prototype.squareTo = function(t4) {
            var e3 = this.abs();
            var r3 = t4.t = 2 * e3.t;
            while (--r3 >= 0)
              t4[r3] = 0;
            for (r3 = 0; r3 < e3.t - 1; ++r3) {
              var i3 = e3.am(r3, e3[r3], t4, 2 * r3, 0, 1);
              if ((t4[r3 + e3.t] += e3.am(r3 + 1, 2 * e3[r3], t4, 2 * r3 + 1, i3, e3.t - r3 - 1)) >= e3.DV) {
                t4[r3 + e3.t] -= e3.DV;
                t4[r3 + e3.t + 1] = 1;
              }
            }
            if (t4.t > 0)
              t4[t4.t - 1] += e3.am(r3, e3[r3], t4, 2 * r3, 0, 1);
            t4.s = 0;
            t4.clamp();
          };
          t3.prototype.divRemTo = function(e3, r3, i3) {
            var n22 = e3.abs();
            if (n22.t <= 0)
              return;
            var s22 = this.abs();
            if (s22.t < n22.t) {
              if (null != r3)
                r3.fromInt(0);
              if (null != i3)
                this.copyTo(i3);
              return;
            }
            if (null == i3)
              i3 = H2();
            var a22 = H2();
            var o22 = this.s;
            var u22 = e3.s;
            var c22 = this.DB - W2(n22[n22.t - 1]);
            if (c22 > 0) {
              n22.lShiftTo(c22, a22);
              s22.lShiftTo(c22, i3);
            } else {
              n22.copyTo(a22);
              s22.copyTo(i3);
            }
            var l22 = a22.t;
            var f22 = a22[l22 - 1];
            if (0 == f22)
              return;
            var h22 = f22 * (1 << this.F1) + (l22 > 1 ? a22[l22 - 2] >> this.F2 : 0);
            var d22 = this.FV / h22;
            var v22 = (1 << this.F1) / h22;
            var p2 = 1 << this.F2;
            var g22 = i3.t;
            var y22 = g22 - l22;
            var m22 = null == r3 ? H2() : r3;
            a22.dlShiftTo(y22, m22);
            if (i3.compareTo(m22) >= 0) {
              i3[i3.t++] = 1;
              i3.subTo(m22, i3);
            }
            t3.ONE.dlShiftTo(l22, m22);
            m22.subTo(a22, a22);
            while (a22.t < l22)
              a22[a22.t++] = 0;
            while (--y22 >= 0) {
              var w22 = i3[--g22] == f22 ? this.DM : Math.floor(i3[g22] * d22 + (i3[g22 - 1] + p2) * v22);
              if ((i3[g22] += a22.am(0, w22, i3, y22, 0, l22)) < w22) {
                a22.dlShiftTo(y22, m22);
                i3.subTo(m22, i3);
                while (i3[g22] < --w22)
                  i3.subTo(m22, i3);
              }
            }
            if (null != r3) {
              i3.drShiftTo(l22, r3);
              if (o22 != u22)
                t3.ZERO.subTo(r3, r3);
            }
            i3.t = l22;
            i3.clamp();
            if (c22 > 0)
              i3.rShiftTo(c22, i3);
            if (o22 < 0)
              t3.ZERO.subTo(i3, i3);
          };
          t3.prototype.invDigit = function() {
            if (this.t < 1)
              return 0;
            var t4 = this[0];
            if (0 == (1 & t4))
              return 0;
            var e3 = 3 & t4;
            e3 = e3 * (2 - (15 & t4) * e3) & 15;
            e3 = e3 * (2 - (255 & t4) * e3) & 255;
            e3 = e3 * (2 - ((65535 & t4) * e3 & 65535)) & 65535;
            e3 = e3 * (2 - t4 * e3 % this.DV) % this.DV;
            return e3 > 0 ? this.DV - e3 : -e3;
          };
          t3.prototype.isEven = function() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s);
          };
          t3.prototype.exp = function(e3, r3) {
            if (e3 > 4294967295 || e3 < 1)
              return t3.ONE;
            var i3 = H2();
            var n22 = H2();
            var s22 = r3.convert(this);
            var a22 = W2(e3) - 1;
            s22.copyTo(i3);
            while (--a22 >= 0) {
              r3.sqrTo(i3, n22);
              if ((e3 & 1 << a22) > 0)
                r3.mulTo(n22, s22, i3);
              else {
                var o22 = i3;
                i3 = n22;
                n22 = o22;
              }
            }
            return r3.revert(i3);
          };
          t3.prototype.chunkSize = function(t4) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t4));
          };
          t3.prototype.toRadix = function(t4) {
            if (null == t4)
              t4 = 10;
            if (0 == this.signum() || t4 < 2 || t4 > 36)
              return "0";
            var e3 = this.chunkSize(t4);
            var r3 = Math.pow(t4, e3);
            var i3 = Y2(r3);
            var n22 = H2();
            var s22 = H2();
            var a22 = "";
            this.divRemTo(i3, n22, s22);
            while (n22.signum() > 0) {
              a22 = (r3 + s22.intValue()).toString(t4).substr(1) + a22;
              n22.divRemTo(i3, n22, s22);
            }
            return s22.intValue().toString(t4) + a22;
          };
          t3.prototype.fromRadix = function(e3, r3) {
            this.fromInt(0);
            if (null == r3)
              r3 = 10;
            var i3 = this.chunkSize(r3);
            var n22 = Math.pow(r3, i3);
            var s22 = false;
            var a22 = 0;
            var o22 = 0;
            for (var u22 = 0; u22 < e3.length; ++u22) {
              var c22 = G2(e3, u22);
              if (c22 < 0) {
                if ("-" == e3.charAt(u22) && 0 == this.signum())
                  s22 = true;
                continue;
              }
              o22 = r3 * o22 + c22;
              if (++a22 >= i3) {
                this.dMultiply(n22);
                this.dAddOffset(o22, 0);
                a22 = 0;
                o22 = 0;
              }
            }
            if (a22 > 0) {
              this.dMultiply(Math.pow(r3, a22));
              this.dAddOffset(o22, 0);
            }
            if (s22)
              t3.ZERO.subTo(this, this);
          };
          t3.prototype.fromNumber = function(e3, r3, i3) {
            if ("number" == typeof r3)
              if (e3 < 2)
                this.fromInt(1);
              else {
                this.fromNumber(e3, i3);
                if (!this.testBit(e3 - 1))
                  this.bitwiseTo(t3.ONE.shiftLeft(e3 - 1), a2, this);
                if (this.isEven())
                  this.dAddOffset(1, 0);
                while (!this.isProbablePrime(r3)) {
                  this.dAddOffset(2, 0);
                  if (this.bitLength() > e3)
                    this.subTo(t3.ONE.shiftLeft(e3 - 1), this);
                }
              }
            else {
              var n22 = [];
              var s22 = 7 & e3;
              n22.length = (e3 >> 3) + 1;
              r3.nextBytes(n22);
              if (s22 > 0)
                n22[0] &= (1 << s22) - 1;
              else
                n22[0] = 0;
              this.fromString(n22, 256);
            }
          };
          t3.prototype.bitwiseTo = function(t4, e3, r3) {
            var i3;
            var n22;
            var s22 = Math.min(t4.t, this.t);
            for (i3 = 0; i3 < s22; ++i3)
              r3[i3] = e3(this[i3], t4[i3]);
            if (t4.t < this.t) {
              n22 = t4.s & this.DM;
              for (i3 = s22; i3 < this.t; ++i3)
                r3[i3] = e3(this[i3], n22);
              r3.t = this.t;
            } else {
              n22 = this.s & this.DM;
              for (i3 = s22; i3 < t4.t; ++i3)
                r3[i3] = e3(n22, t4[i3]);
              r3.t = t4.t;
            }
            r3.s = e3(this.s, t4.s);
            r3.clamp();
          };
          t3.prototype.changeBit = function(e3, r3) {
            var i3 = t3.ONE.shiftLeft(e3);
            this.bitwiseTo(i3, r3, i3);
            return i3;
          };
          t3.prototype.addTo = function(t4, e3) {
            var r3 = 0;
            var i3 = 0;
            var n22 = Math.min(t4.t, this.t);
            while (r3 < n22) {
              i3 += this[r3] + t4[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            if (t4.t < this.t) {
              i3 += t4.s;
              while (r3 < this.t) {
                i3 += this[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 += this.s;
            } else {
              i3 += this.s;
              while (r3 < t4.t) {
                i3 += t4[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 += t4.s;
            }
            e3.s = i3 < 0 ? -1 : 0;
            if (i3 > 0)
              e3[r3++] = i3;
            else if (i3 < -1)
              e3[r3++] = this.DV + i3;
            e3.t = r3;
            e3.clamp();
          };
          t3.prototype.dMultiply = function(t4) {
            this[this.t] = this.am(0, t4 - 1, this, 0, 0, this.t);
            ++this.t;
            this.clamp();
          };
          t3.prototype.dAddOffset = function(t4, e3) {
            if (0 == t4)
              return;
            while (this.t <= e3)
              this[this.t++] = 0;
            this[e3] += t4;
            while (this[e3] >= this.DV) {
              this[e3] -= this.DV;
              if (++e3 >= this.t)
                this[this.t++] = 0;
              ++this[e3];
            }
          };
          t3.prototype.multiplyLowerTo = function(t4, e3, r3) {
            var i3 = Math.min(this.t + t4.t, e3);
            r3.s = 0;
            r3.t = i3;
            while (i3 > 0)
              r3[--i3] = 0;
            for (var n22 = r3.t - this.t; i3 < n22; ++i3)
              r3[i3 + this.t] = this.am(0, t4[i3], r3, i3, 0, this.t);
            for (var n22 = Math.min(t4.t, e3); i3 < n22; ++i3)
              this.am(0, t4[i3], r3, i3, 0, e3 - i3);
            r3.clamp();
          };
          t3.prototype.multiplyUpperTo = function(t4, e3, r3) {
            --e3;
            var i3 = r3.t = this.t + t4.t - e3;
            r3.s = 0;
            while (--i3 >= 0)
              r3[i3] = 0;
            for (i3 = Math.max(e3 - this.t, 0); i3 < t4.t; ++i3)
              r3[this.t + i3 - e3] = this.am(e3 - i3, t4[i3], r3, 0, 0, this.t + i3 - e3);
            r3.clamp();
            r3.drShiftTo(1, r3);
          };
          t3.prototype.modInt = function(t4) {
            if (t4 <= 0)
              return 0;
            var e3 = this.DV % t4;
            var r3 = this.s < 0 ? t4 - 1 : 0;
            if (this.t > 0)
              if (0 == e3)
                r3 = this[0] % t4;
              else
                for (var i3 = this.t - 1; i3 >= 0; --i3)
                  r3 = (e3 * r3 + this[i3]) % t4;
            return r3;
          };
          t3.prototype.millerRabin = function(e3) {
            var r3 = this.subtract(t3.ONE);
            var i3 = r3.getLowestSetBit();
            if (i3 <= 0)
              return false;
            var n22 = r3.shiftRight(i3);
            e3 = e3 + 1 >> 1;
            if (e3 > O2.length)
              e3 = O2.length;
            var s22 = H2();
            for (var a22 = 0; a22 < e3; ++a22) {
              s22.fromInt(O2[Math.floor(Math.random() * O2.length)]);
              var o22 = s22.modPow(n22, this);
              if (0 != o22.compareTo(t3.ONE) && 0 != o22.compareTo(r3)) {
                var u22 = 1;
                while (u22++ < i3 && 0 != o22.compareTo(r3)) {
                  o22 = o22.modPowInt(2, this);
                  if (0 == o22.compareTo(t3.ONE))
                    return false;
                }
                if (0 != o22.compareTo(r3))
                  return false;
              }
            }
            return true;
          };
          t3.prototype.square = function() {
            var t4 = H2();
            this.squareTo(t4);
            return t4;
          };
          t3.prototype.gcda = function(t4, e3) {
            var r3 = this.s < 0 ? this.negate() : this.clone();
            var i3 = t4.s < 0 ? t4.negate() : t4.clone();
            if (r3.compareTo(i3) < 0) {
              var n22 = r3;
              r3 = i3;
              i3 = n22;
            }
            var s22 = r3.getLowestSetBit();
            var a22 = i3.getLowestSetBit();
            if (a22 < 0) {
              e3(r3);
              return;
            }
            if (s22 < a22)
              a22 = s22;
            if (a22 > 0) {
              r3.rShiftTo(a22, r3);
              i3.rShiftTo(a22, i3);
            }
            var o22 = function() {
              if ((s22 = r3.getLowestSetBit()) > 0)
                r3.rShiftTo(s22, r3);
              if ((s22 = i3.getLowestSetBit()) > 0)
                i3.rShiftTo(s22, i3);
              if (r3.compareTo(i3) >= 0) {
                r3.subTo(i3, r3);
                r3.rShiftTo(1, r3);
              } else {
                i3.subTo(r3, i3);
                i3.rShiftTo(1, i3);
              }
              if (!(r3.signum() > 0)) {
                if (a22 > 0)
                  i3.lShiftTo(a22, i3);
                setTimeout(function() {
                  e3(i3);
                }, 0);
              } else
                setTimeout(o22, 0);
            };
            setTimeout(o22, 10);
          };
          t3.prototype.fromNumberAsync = function(e3, r3, i3, n22) {
            if ("number" == typeof r3)
              if (e3 < 2)
                this.fromInt(1);
              else {
                this.fromNumber(e3, i3);
                if (!this.testBit(e3 - 1))
                  this.bitwiseTo(t3.ONE.shiftLeft(e3 - 1), a2, this);
                if (this.isEven())
                  this.dAddOffset(1, 0);
                var s22 = this;
                var o22 = function() {
                  s22.dAddOffset(2, 0);
                  if (s22.bitLength() > e3)
                    s22.subTo(t3.ONE.shiftLeft(e3 - 1), s22);
                  if (s22.isProbablePrime(r3))
                    setTimeout(function() {
                      n22();
                    }, 0);
                  else
                    setTimeout(o22, 0);
                };
                setTimeout(o22, 0);
              }
            else {
              var u22 = [];
              var c22 = 7 & e3;
              u22.length = (e3 >> 3) + 1;
              r3.nextBytes(u22);
              if (c22 > 0)
                u22[0] &= (1 << c22) - 1;
              else
                u22[0] = 0;
              this.fromString(u22, 256);
            }
          };
          return t3;
        }();
        var N2 = function() {
          function t3() {
          }
          t3.prototype.convert = function(t4) {
            return t4;
          };
          t3.prototype.revert = function(t4) {
            return t4;
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
          };
          return t3;
        }();
        var P2 = function() {
          function t3(t4) {
            this.m = t4;
          }
          t3.prototype.convert = function(t4) {
            if (t4.s < 0 || t4.compareTo(this.m) >= 0)
              return t4.mod(this.m);
            else
              return t4;
          };
          t3.prototype.revert = function(t4) {
            return t4;
          };
          t3.prototype.reduce = function(t4) {
            t4.divRemTo(this.m, null, t4);
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
            this.reduce(r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
            this.reduce(e3);
          };
          return t3;
        }();
        var V2 = function() {
          function t3(t4) {
            this.m = t4;
            this.mp = t4.invDigit();
            this.mpl = 32767 & this.mp;
            this.mph = this.mp >> 15;
            this.um = (1 << t4.DB - 15) - 1;
            this.mt2 = 2 * t4.t;
          }
          t3.prototype.convert = function(t4) {
            var e3 = H2();
            t4.abs().dlShiftTo(this.m.t, e3);
            e3.divRemTo(this.m, null, e3);
            if (t4.s < 0 && e3.compareTo(C2.ZERO) > 0)
              this.m.subTo(e3, e3);
            return e3;
          };
          t3.prototype.revert = function(t4) {
            var e3 = H2();
            t4.copyTo(e3);
            this.reduce(e3);
            return e3;
          };
          t3.prototype.reduce = function(t4) {
            while (t4.t <= this.mt2)
              t4[t4.t++] = 0;
            for (var e3 = 0; e3 < this.m.t; ++e3) {
              var r3 = 32767 & t4[e3];
              var i3 = r3 * this.mpl + ((r3 * this.mph + (t4[e3] >> 15) * this.mpl & this.um) << 15) & t4.DM;
              r3 = e3 + this.m.t;
              t4[r3] += this.m.am(0, i3, t4, e3, 0, this.m.t);
              while (t4[r3] >= t4.DV) {
                t4[r3] -= t4.DV;
                t4[++r3]++;
              }
            }
            t4.clamp();
            t4.drShiftTo(this.m.t, t4);
            if (t4.compareTo(this.m) >= 0)
              t4.subTo(this.m, t4);
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
            this.reduce(r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
            this.reduce(e3);
          };
          return t3;
        }();
        var L2 = function() {
          function t3(t4) {
            this.m = t4;
            this.r2 = H2();
            this.q3 = H2();
            C2.ONE.dlShiftTo(2 * t4.t, this.r2);
            this.mu = this.r2.divide(t4);
          }
          t3.prototype.convert = function(t4) {
            if (t4.s < 0 || t4.t > 2 * this.m.t)
              return t4.mod(this.m);
            else if (t4.compareTo(this.m) < 0)
              return t4;
            else {
              var e3 = H2();
              t4.copyTo(e3);
              this.reduce(e3);
              return e3;
            }
          };
          t3.prototype.revert = function(t4) {
            return t4;
          };
          t3.prototype.reduce = function(t4) {
            t4.drShiftTo(this.m.t - 1, this.r2);
            if (t4.t > this.m.t + 1) {
              t4.t = this.m.t + 1;
              t4.clamp();
            }
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
            while (t4.compareTo(this.r2) < 0)
              t4.dAddOffset(1, this.m.t + 1);
            t4.subTo(this.r2, t4);
            while (t4.compareTo(this.m) >= 0)
              t4.subTo(this.m, t4);
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
            this.reduce(r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
            this.reduce(e3);
          };
          return t3;
        }();
        function H2() {
          return new C2(null);
        }
        function U2(t3, e3) {
          return new C2(t3, e3);
        }
        var K2 = "undefined" !== typeof navigator;
        if (K2 && B2 && "Microsoft Internet Explorer" == navigator.appName) {
          C2.prototype.am = function t3(e3, r3, i3, n22, s22, a22) {
            var o22 = 32767 & r3;
            var u22 = r3 >> 15;
            while (--a22 >= 0) {
              var c22 = 32767 & this[e3];
              var l22 = this[e3++] >> 15;
              var f22 = u22 * c22 + l22 * o22;
              c22 = o22 * c22 + ((32767 & f22) << 15) + i3[n22] + (1073741823 & s22);
              s22 = (c22 >>> 30) + (f22 >>> 15) + u22 * l22 + (s22 >>> 30);
              i3[n22++] = 1073741823 & c22;
            }
            return s22;
          };
          x = 30;
        } else if (K2 && B2 && "Netscape" != navigator.appName) {
          C2.prototype.am = function t3(e3, r3, i3, n22, s22, a22) {
            while (--a22 >= 0) {
              var o22 = r3 * this[e3++] + i3[n22] + s22;
              s22 = Math.floor(o22 / 67108864);
              i3[n22++] = 67108863 & o22;
            }
            return s22;
          };
          x = 26;
        } else {
          C2.prototype.am = function t3(e3, r3, i3, n22, s22, a22) {
            var o22 = 16383 & r3;
            var u22 = r3 >> 14;
            while (--a22 >= 0) {
              var c22 = 16383 & this[e3];
              var l22 = this[e3++] >> 14;
              var f22 = u22 * c22 + l22 * o22;
              c22 = o22 * c22 + ((16383 & f22) << 14) + i3[n22] + s22;
              s22 = (c22 >> 28) + (f22 >> 14) + u22 * l22;
              i3[n22++] = 268435455 & c22;
            }
            return s22;
          };
          x = 28;
        }
        C2.prototype.DB = x;
        C2.prototype.DM = (1 << x) - 1;
        C2.prototype.DV = 1 << x;
        var j2 = 52;
        C2.prototype.FV = Math.pow(2, j2);
        C2.prototype.F1 = j2 - x;
        C2.prototype.F2 = 2 * x - j2;
        var q2 = [];
        var F2;
        var z2;
        F2 = "0".charCodeAt(0);
        for (z2 = 0; z2 <= 9; ++z2)
          q2[F2++] = z2;
        F2 = "a".charCodeAt(0);
        for (z2 = 10; z2 < 36; ++z2)
          q2[F2++] = z2;
        F2 = "A".charCodeAt(0);
        for (z2 = 10; z2 < 36; ++z2)
          q2[F2++] = z2;
        function G2(t3, e3) {
          var r3 = q2[t3.charCodeAt(e3)];
          return null == r3 ? -1 : r3;
        }
        function Y2(t3) {
          var e3 = H2();
          e3.fromInt(t3);
          return e3;
        }
        function W2(t3) {
          var e3 = 1;
          var r3;
          if (0 != (r3 = t3 >>> 16)) {
            t3 = r3;
            e3 += 16;
          }
          if (0 != (r3 = t3 >> 8)) {
            t3 = r3;
            e3 += 8;
          }
          if (0 != (r3 = t3 >> 4)) {
            t3 = r3;
            e3 += 4;
          }
          if (0 != (r3 = t3 >> 2)) {
            t3 = r3;
            e3 += 2;
          }
          if (0 != (r3 = t3 >> 1)) {
            t3 = r3;
            e3 += 1;
          }
          return e3;
        }
        C2.ZERO = Y2(0);
        C2.ONE = Y2(1);
        var J2 = function() {
          function t3() {
            this.i = 0;
            this.j = 0;
            this.S = [];
          }
          t3.prototype.init = function(t4) {
            var e3;
            var r3;
            var i3;
            for (e3 = 0; e3 < 256; ++e3)
              this.S[e3] = e3;
            r3 = 0;
            for (e3 = 0; e3 < 256; ++e3) {
              r3 = r3 + this.S[e3] + t4[e3 % t4.length] & 255;
              i3 = this.S[e3];
              this.S[e3] = this.S[r3];
              this.S[r3] = i3;
            }
            this.i = 0;
            this.j = 0;
          };
          t3.prototype.next = function() {
            var t4;
            this.i = this.i + 1 & 255;
            this.j = this.j + this.S[this.i] & 255;
            t4 = this.S[this.i];
            this.S[this.i] = this.S[this.j];
            this.S[this.j] = t4;
            return this.S[t4 + this.S[this.i] & 255];
          };
          return t3;
        }();
        function Z2() {
          return new J2();
        }
        var $2 = 256;
        var X2;
        var Q2 = null;
        var tt2;
        if (null == Q2) {
          Q2 = [];
          tt2 = 0;
        }
        function nt2() {
          if (null == X2) {
            X2 = Z2();
            while (tt2 < $2) {
              var t3 = Math.floor(65536 * Math.random());
              Q2[tt2++] = 255 & t3;
            }
            X2.init(Q2);
            for (tt2 = 0; tt2 < Q2.length; ++tt2)
              Q2[tt2] = 0;
            tt2 = 0;
          }
          return X2.next();
        }
        var st2 = function() {
          function t3() {
          }
          t3.prototype.nextBytes = function(t4) {
            for (var e3 = 0; e3 < t4.length; ++e3)
              t4[e3] = nt2();
          };
          return t3;
        }();
        function at2(t3, e3) {
          if (e3 < t3.length + 22) {
            console.error("Message too long for RSA");
            return null;
          }
          var r3 = e3 - t3.length - 6;
          var i3 = "";
          for (var n22 = 0; n22 < r3; n22 += 2)
            i3 += "ff";
          var s22 = "0001" + i3 + "00" + t3;
          return U2(s22, 16);
        }
        function ot2(t3, e3) {
          if (e3 < t3.length + 11) {
            console.error("Message too long for RSA");
            return null;
          }
          var r3 = [];
          var i3 = t3.length - 1;
          while (i3 >= 0 && e3 > 0) {
            var n22 = t3.charCodeAt(i3--);
            if (n22 < 128)
              r3[--e3] = n22;
            else if (n22 > 127 && n22 < 2048) {
              r3[--e3] = 63 & n22 | 128;
              r3[--e3] = n22 >> 6 | 192;
            } else {
              r3[--e3] = 63 & n22 | 128;
              r3[--e3] = n22 >> 6 & 63 | 128;
              r3[--e3] = n22 >> 12 | 224;
            }
          }
          r3[--e3] = 0;
          var s22 = new st2();
          var a22 = [];
          while (e3 > 2) {
            a22[0] = 0;
            while (0 == a22[0])
              s22.nextBytes(a22);
            r3[--e3] = a22[0];
          }
          r3[--e3] = 2;
          r3[--e3] = 0;
          return new C2(r3);
        }
        var ut2 = function() {
          function t3() {
            this.n = null;
            this.e = 0;
            this.d = null;
            this.p = null;
            this.q = null;
            this.dmp1 = null;
            this.dmq1 = null;
            this.coeff = null;
          }
          t3.prototype.doPublic = function(t4) {
            return t4.modPowInt(this.e, this.n);
          };
          t3.prototype.doPrivate = function(t4) {
            if (null == this.p || null == this.q)
              return t4.modPow(this.d, this.n);
            var e3 = t4.mod(this.p).modPow(this.dmp1, this.p);
            var r3 = t4.mod(this.q).modPow(this.dmq1, this.q);
            while (e3.compareTo(r3) < 0)
              e3 = e3.add(this.p);
            return e3.subtract(r3).multiply(this.coeff).mod(this.p).multiply(this.q).add(r3);
          };
          t3.prototype.setPublic = function(t4, e3) {
            if (null != t4 && null != e3 && t4.length > 0 && e3.length > 0) {
              this.n = U2(t4, 16);
              this.e = parseInt(e3, 16);
            } else
              console.error("Invalid RSA public key");
          };
          t3.prototype.encrypt = function(t4) {
            var e3 = this.n.bitLength() + 7 >> 3;
            var r3 = ot2(t4, e3);
            if (null == r3)
              return null;
            var i3 = this.doPublic(r3);
            if (null == i3)
              return null;
            var n22 = i3.toString(16);
            var s22 = n22.length;
            for (var a22 = 0; a22 < 2 * e3 - s22; a22++)
              n22 = "0" + n22;
            return n22;
          };
          t3.prototype.setPrivate = function(t4, e3, r3) {
            if (null != t4 && null != e3 && t4.length > 0 && e3.length > 0) {
              this.n = U2(t4, 16);
              this.e = parseInt(e3, 16);
              this.d = U2(r3, 16);
            } else
              console.error("Invalid RSA private key");
          };
          t3.prototype.setPrivateEx = function(t4, e3, r3, i3, n22, s22, a22, o22) {
            if (null != t4 && null != e3 && t4.length > 0 && e3.length > 0) {
              this.n = U2(t4, 16);
              this.e = parseInt(e3, 16);
              this.d = U2(r3, 16);
              this.p = U2(i3, 16);
              this.q = U2(n22, 16);
              this.dmp1 = U2(s22, 16);
              this.dmq1 = U2(a22, 16);
              this.coeff = U2(o22, 16);
            } else
              console.error("Invalid RSA private key");
          };
          t3.prototype.generate = function(t4, e3) {
            var r3 = new st2();
            var i3 = t4 >> 1;
            this.e = parseInt(e3, 16);
            var n22 = new C2(e3, 16);
            for (; ; ) {
              for (; ; ) {
                this.p = new C2(t4 - i3, 1, r3);
                if (0 == this.p.subtract(C2.ONE).gcd(n22).compareTo(C2.ONE) && this.p.isProbablePrime(10))
                  break;
              }
              for (; ; ) {
                this.q = new C2(i3, 1, r3);
                if (0 == this.q.subtract(C2.ONE).gcd(n22).compareTo(C2.ONE) && this.q.isProbablePrime(10))
                  break;
              }
              if (this.p.compareTo(this.q) <= 0) {
                var s22 = this.p;
                this.p = this.q;
                this.q = s22;
              }
              var a22 = this.p.subtract(C2.ONE);
              var o22 = this.q.subtract(C2.ONE);
              var u22 = a22.multiply(o22);
              if (0 == u22.gcd(n22).compareTo(C2.ONE)) {
                this.n = this.p.multiply(this.q);
                this.d = n22.modInverse(u22);
                this.dmp1 = this.d.mod(a22);
                this.dmq1 = this.d.mod(o22);
                this.coeff = this.q.modInverse(this.p);
                break;
              }
            }
          };
          t3.prototype.decrypt = function(t4) {
            var e3 = U2(t4, 16);
            var r3 = this.doPrivate(e3);
            if (null == r3)
              return null;
            return ct2(r3, this.n.bitLength() + 7 >> 3);
          };
          t3.prototype.generateAsync = function(t4, e3, r3) {
            var i3 = new st2();
            var n22 = t4 >> 1;
            this.e = parseInt(e3, 16);
            var s22 = new C2(e3, 16);
            var a22 = this;
            var o22 = function() {
              var e4 = function() {
                if (a22.p.compareTo(a22.q) <= 0) {
                  var t5 = a22.p;
                  a22.p = a22.q;
                  a22.q = t5;
                }
                var e5 = a22.p.subtract(C2.ONE);
                var i4 = a22.q.subtract(C2.ONE);
                var n3 = e5.multiply(i4);
                if (0 == n3.gcd(s22).compareTo(C2.ONE)) {
                  a22.n = a22.p.multiply(a22.q);
                  a22.d = s22.modInverse(n3);
                  a22.dmp1 = a22.d.mod(e5);
                  a22.dmq1 = a22.d.mod(i4);
                  a22.coeff = a22.q.modInverse(a22.p);
                  setTimeout(function() {
                    r3();
                  }, 0);
                } else
                  setTimeout(o22, 0);
              };
              var u22 = function() {
                a22.q = H2();
                a22.q.fromNumberAsync(n22, 1, i3, function() {
                  a22.q.subtract(C2.ONE).gcda(s22, function(t5) {
                    if (0 == t5.compareTo(C2.ONE) && a22.q.isProbablePrime(10))
                      setTimeout(e4, 0);
                    else
                      setTimeout(u22, 0);
                  });
                });
              };
              var c22 = function() {
                a22.p = H2();
                a22.p.fromNumberAsync(t4 - n22, 1, i3, function() {
                  a22.p.subtract(C2.ONE).gcda(s22, function(t5) {
                    if (0 == t5.compareTo(C2.ONE) && a22.p.isProbablePrime(10))
                      setTimeout(u22, 0);
                    else
                      setTimeout(c22, 0);
                  });
                });
              };
              setTimeout(c22, 0);
            };
            setTimeout(o22, 0);
          };
          t3.prototype.sign = function(t4, e3, r3) {
            var i3 = ht2(r3);
            var n22 = i3 + e3(t4).toString();
            var s22 = at2(n22, this.n.bitLength() / 4);
            if (null == s22)
              return null;
            var a22 = this.doPrivate(s22);
            if (null == a22)
              return null;
            var o22 = a22.toString(16);
            if (0 == (1 & o22.length))
              return o22;
            else
              return "0" + o22;
          };
          t3.prototype.verify = function(t4, e3, r3) {
            var i3 = U2(e3, 16);
            var n22 = this.doPublic(i3);
            if (null == n22)
              return null;
            var s22 = n22.toString(16).replace(/^1f+00/, "");
            var a22 = dt2(s22);
            return a22 == r3(t4).toString();
          };
          t3.prototype.encryptLong = function(t4) {
            var e3 = this;
            var r3 = "";
            var i3 = (this.n.bitLength() + 7 >> 3) - 11;
            var n22 = this.setSplitChn(t4, i3);
            n22.forEach(function(t5) {
              r3 += e3.encrypt(t5);
            });
            return r3;
          };
          t3.prototype.decryptLong = function(t4) {
            var e3 = "";
            var r3 = this.n.bitLength() + 7 >> 3;
            var i3 = 2 * r3;
            if (t4.length > i3) {
              var n22 = t4.match(new RegExp(".{1," + i3 + "}", "g")) || [];
              var s22 = [];
              for (var a22 = 0; a22 < n22.length; a22++) {
                var o22 = U2(n22[a22], 16);
                var u22 = this.doPrivate(o22);
                if (null == u22)
                  return null;
                s22.push(u22);
              }
              e3 = lt2(s22, r3);
            } else
              e3 = this.decrypt(t4);
            return e3;
          };
          t3.prototype.setSplitChn = function(t4, e3, r3) {
            if (void 0 === r3)
              r3 = [];
            var i3 = t4.split("");
            var n22 = 0;
            for (var s22 = 0; s22 < i3.length; s22++) {
              var a22 = i3[s22].charCodeAt(0);
              if (a22 <= 127)
                n22 += 1;
              else if (a22 <= 2047)
                n22 += 2;
              else if (a22 <= 65535)
                n22 += 3;
              else
                n22 += 4;
              if (n22 > e3) {
                var o22 = t4.substring(0, s22);
                r3.push(o22);
                return this.setSplitChn(t4.substring(s22), e3, r3);
              }
            }
            r3.push(t4);
            return r3;
          };
          return t3;
        }();
        function ct2(t3, e3) {
          var r3 = t3.toByteArray();
          var i3 = 0;
          while (i3 < r3.length && 0 == r3[i3])
            ++i3;
          if (r3.length - i3 != e3 - 1 || 2 != r3[i3])
            return null;
          ++i3;
          while (0 != r3[i3])
            if (++i3 >= r3.length)
              return null;
          var n22 = "";
          while (++i3 < r3.length) {
            var s22 = 255 & r3[i3];
            if (s22 < 128)
              n22 += String.fromCharCode(s22);
            else if (s22 > 191 && s22 < 224) {
              n22 += String.fromCharCode((31 & s22) << 6 | 63 & r3[i3 + 1]);
              ++i3;
            } else {
              n22 += String.fromCharCode((15 & s22) << 12 | (63 & r3[i3 + 1]) << 6 | 63 & r3[i3 + 2]);
              i3 += 2;
            }
          }
          return n22;
        }
        function lt2(t3, e3) {
          var r3 = [];
          for (var i3 = 0; i3 < t3.length; i3++) {
            var n22 = t3[i3];
            var s22 = n22.toByteArray();
            var a22 = 0;
            while (a22 < s22.length && 0 == s22[a22])
              ++a22;
            if (s22.length - a22 != e3 - 1 || 2 != s22[a22])
              return null;
            ++a22;
            while (0 != s22[a22])
              if (++a22 >= s22.length)
                return null;
            r3 = r3.concat(s22.slice(a22 + 1));
          }
          var o22 = r3;
          var u22 = -1;
          var c22 = "";
          while (++u22 < o22.length) {
            var l22 = 255 & o22[u22];
            if (l22 < 128)
              c22 += String.fromCharCode(l22);
            else if (l22 > 191 && l22 < 224) {
              c22 += String.fromCharCode((31 & l22) << 6 | 63 & o22[u22 + 1]);
              ++u22;
            } else {
              c22 += String.fromCharCode((15 & l22) << 12 | (63 & o22[u22 + 1]) << 6 | 63 & o22[u22 + 2]);
              u22 += 2;
            }
          }
          return c22;
        }
        var ft2 = { md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", ripemd160: "3021300906052b2403020105000414" };
        function ht2(t3) {
          return ft2[t3] || "";
        }
        function dt2(t3) {
          for (var e3 in ft2)
            if (ft2.hasOwnProperty(e3)) {
              var r3 = ft2[e3];
              var i3 = r3.length;
              if (t3.substr(0, i3) == r3)
                return t3.substr(i3);
            }
          return t3;
        }
        var vt2 = {};
        vt2.lang = { extend: function(t3, e3, r3) {
          if (!e3 || !t3)
            throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
          var i3 = function() {
          };
          i3.prototype = e3.prototype;
          t3.prototype = new i3();
          t3.prototype.constructor = t3;
          t3.superclass = e3.prototype;
          if (e3.prototype.constructor == Object.prototype.constructor)
            e3.prototype.constructor = e3;
          if (r3) {
            var n22;
            for (n22 in r3)
              t3.prototype[n22] = r3[n22];
            var s22 = function() {
            }, a22 = ["toString", "valueOf"];
            try {
              if (/MSIE/.test(navigator.userAgent))
                s22 = function(t4, e4) {
                  for (n22 = 0; n22 < a22.length; n22 += 1) {
                    var r4 = a22[n22], i4 = e4[r4];
                    if ("function" === typeof i4 && i4 != Object.prototype[r4])
                      t4[r4] = i4;
                  }
                };
            } catch (t4) {
            }
            s22(t3.prototype, r3);
          }
        } };
        var pt2 = {};
        if ("undefined" == typeof pt2.asn1 || !pt2.asn1)
          pt2.asn1 = {};
        pt2.asn1.ASN1Util = new function() {
          this.integerToByteHex = function(t3) {
            var e3 = t3.toString(16);
            if (e3.length % 2 == 1)
              e3 = "0" + e3;
            return e3;
          };
          this.bigIntToMinTwosComplementsHex = function(t3) {
            var e3 = t3.toString(16);
            if ("-" != e3.substr(0, 1)) {
              if (e3.length % 2 == 1)
                e3 = "0" + e3;
              else if (!e3.match(/^[0-7]/))
                e3 = "00" + e3;
            } else {
              var r3 = e3.substr(1);
              var i3 = r3.length;
              if (i3 % 2 == 1)
                i3 += 1;
              else if (!e3.match(/^[0-7]/))
                i3 += 2;
              var n22 = "";
              for (var s22 = 0; s22 < i3; s22++)
                n22 += "f";
              var a22 = new C2(n22, 16);
              var o22 = a22.xor(t3).add(C2.ONE);
              e3 = o22.toString(16).replace(/^-/, "");
            }
            return e3;
          };
          this.getPEMStringFromHex = function(t3, e3) {
            return hextopem(t3, e3);
          };
          this.newObject = function(t3) {
            var e3 = pt2, r3 = e3.asn1, i3 = r3.DERBoolean, n22 = r3.DERInteger, s22 = r3.DERBitString, a22 = r3.DEROctetString, o22 = r3.DERNull, u22 = r3.DERObjectIdentifier, c22 = r3.DEREnumerated, l22 = r3.DERUTF8String, f22 = r3.DERNumericString, h22 = r3.DERPrintableString, d22 = r3.DERTeletexString, v22 = r3.DERIA5String, p2 = r3.DERUTCTime, g22 = r3.DERGeneralizedTime, y22 = r3.DERSequence, m22 = r3.DERSet, w22 = r3.DERTaggedObject, S22 = r3.ASN1Util.newObject;
            var _22 = Object.keys(t3);
            if (1 != _22.length)
              throw "key of param shall be only one.";
            var b22 = _22[0];
            if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b22 + ":"))
              throw "undefined key: " + b22;
            if ("bool" == b22)
              return new i3(t3[b22]);
            if ("int" == b22)
              return new n22(t3[b22]);
            if ("bitstr" == b22)
              return new s22(t3[b22]);
            if ("octstr" == b22)
              return new a22(t3[b22]);
            if ("null" == b22)
              return new o22(t3[b22]);
            if ("oid" == b22)
              return new u22(t3[b22]);
            if ("enum" == b22)
              return new c22(t3[b22]);
            if ("utf8str" == b22)
              return new l22(t3[b22]);
            if ("numstr" == b22)
              return new f22(t3[b22]);
            if ("prnstr" == b22)
              return new h22(t3[b22]);
            if ("telstr" == b22)
              return new d22(t3[b22]);
            if ("ia5str" == b22)
              return new v22(t3[b22]);
            if ("utctime" == b22)
              return new p2(t3[b22]);
            if ("gentime" == b22)
              return new g22(t3[b22]);
            if ("seq" == b22) {
              var E22 = t3[b22];
              var D22 = [];
              for (var M22 = 0; M22 < E22.length; M22++) {
                var T22 = S22(E22[M22]);
                D22.push(T22);
              }
              return new y22({ array: D22 });
            }
            if ("set" == b22) {
              var E22 = t3[b22];
              var D22 = [];
              for (var M22 = 0; M22 < E22.length; M22++) {
                var T22 = S22(E22[M22]);
                D22.push(T22);
              }
              return new m22({ array: D22 });
            }
            if ("tag" == b22) {
              var I22 = t3[b22];
              if ("[object Array]" === Object.prototype.toString.call(I22) && 3 == I22.length) {
                var A22 = S22(I22[2]);
                return new w22({ tag: I22[0], explicit: I22[1], obj: A22 });
              } else {
                var x2 = {};
                if (void 0 !== I22.explicit)
                  x2.explicit = I22.explicit;
                if (void 0 !== I22.tag)
                  x2.tag = I22.tag;
                if (void 0 === I22.obj)
                  throw "obj shall be specified for 'tag'.";
                x2.obj = S22(I22.obj);
                return new w22(x2);
              }
            }
          };
          this.jsonToASN1HEX = function(t3) {
            var e3 = this.newObject(t3);
            return e3.getEncodedHex();
          };
        }();
        pt2.asn1.ASN1Util.oidHexToInt = function(t3) {
          var e3 = "";
          var r3 = parseInt(t3.substr(0, 2), 16);
          var i3 = Math.floor(r3 / 40);
          var n22 = r3 % 40;
          var e3 = i3 + "." + n22;
          var s22 = "";
          for (var a22 = 2; a22 < t3.length; a22 += 2) {
            var o22 = parseInt(t3.substr(a22, 2), 16);
            var u22 = ("00000000" + o22.toString(2)).slice(-8);
            s22 += u22.substr(1, 7);
            if ("0" == u22.substr(0, 1)) {
              var c22 = new C2(s22, 2);
              e3 = e3 + "." + c22.toString(10);
              s22 = "";
            }
          }
          return e3;
        };
        pt2.asn1.ASN1Util.oidIntToHex = function(t3) {
          var e3 = function(t4) {
            var e4 = t4.toString(16);
            if (1 == e4.length)
              e4 = "0" + e4;
            return e4;
          };
          var r3 = function(t4) {
            var r4 = "";
            var i4 = new C2(t4, 10);
            var n3 = i4.toString(2);
            var s3 = 7 - n3.length % 7;
            if (7 == s3)
              s3 = 0;
            var a3 = "";
            for (var o22 = 0; o22 < s3; o22++)
              a3 += "0";
            n3 = a3 + n3;
            for (var o22 = 0; o22 < n3.length - 1; o22 += 7) {
              var u22 = n3.substr(o22, 7);
              if (o22 != n3.length - 7)
                u22 = "1" + u22;
              r4 += e3(parseInt(u22, 2));
            }
            return r4;
          };
          if (!t3.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t3;
          var i3 = "";
          var n22 = t3.split(".");
          var s22 = 40 * parseInt(n22[0]) + parseInt(n22[1]);
          i3 += e3(s22);
          n22.splice(0, 2);
          for (var a22 = 0; a22 < n22.length; a22++)
            i3 += r3(n22[a22]);
          return i3;
        };
        pt2.asn1.ASN1Object = function() {
          var n22 = "";
          this.getLengthHexFromValue = function() {
            if ("undefined" == typeof this.hV || null == this.hV)
              throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1)
              throw "value hex must be even length: n=" + n22.length + ",v=" + this.hV;
            var t3 = this.hV.length / 2;
            var e3 = t3.toString(16);
            if (e3.length % 2 == 1)
              e3 = "0" + e3;
            if (t3 < 128)
              return e3;
            else {
              var r3 = e3.length / 2;
              if (r3 > 15)
                throw "ASN.1 length too long to represent by 8x: n = " + t3.toString(16);
              var i3 = 128 + r3;
              return i3.toString(16) + e3;
            }
          };
          this.getEncodedHex = function() {
            if (null == this.hTLV || this.isModified) {
              this.hV = this.getFreshValueHex();
              this.hL = this.getLengthHexFromValue();
              this.hTLV = this.hT + this.hL + this.hV;
              this.isModified = false;
            }
            return this.hTLV;
          };
          this.getValueHex = function() {
            this.getEncodedHex();
            return this.hV;
          };
          this.getFreshValueHex = function() {
            return "";
          };
        };
        pt2.asn1.DERAbstractString = function(t3) {
          pt2.asn1.DERAbstractString.superclass.constructor.call(this);
          this.getString = function() {
            return this.s;
          };
          this.setString = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = t4;
            this.hV = stohex(this.s);
          };
          this.setStringHex = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if ("undefined" != typeof t3) {
            if ("string" == typeof t3)
              this.setString(t3);
            else if ("undefined" != typeof t3["str"])
              this.setString(t3["str"]);
            else if ("undefined" != typeof t3["hex"])
              this.setStringHex(t3["hex"]);
          }
        };
        vt2.lang.extend(pt2.asn1.DERAbstractString, pt2.asn1.ASN1Object);
        pt2.asn1.DERAbstractTime = function(t3) {
          pt2.asn1.DERAbstractTime.superclass.constructor.call(this);
          this.localDateToUTC = function(t4) {
            utc = t4.getTime() + 6e4 * t4.getTimezoneOffset();
            var e3 = new Date(utc);
            return e3;
          };
          this.formatDate = function(t4, e3, r3) {
            var i3 = this.zeroPadding;
            var n22 = this.localDateToUTC(t4);
            var s22 = String(n22.getFullYear());
            if ("utc" == e3)
              s22 = s22.substr(2, 2);
            var a22 = i3(String(n22.getMonth() + 1), 2);
            var o22 = i3(String(n22.getDate()), 2);
            var u22 = i3(String(n22.getHours()), 2);
            var c22 = i3(String(n22.getMinutes()), 2);
            var l22 = i3(String(n22.getSeconds()), 2);
            var f22 = s22 + a22 + o22 + u22 + c22 + l22;
            if (true === r3) {
              var h22 = n22.getMilliseconds();
              if (0 != h22) {
                var d22 = i3(String(h22), 3);
                d22 = d22.replace(/[0]+$/, "");
                f22 = f22 + "." + d22;
              }
            }
            return f22 + "Z";
          };
          this.zeroPadding = function(t4, e3) {
            if (t4.length >= e3)
              return t4;
            return new Array(e3 - t4.length + 1).join("0") + t4;
          };
          this.getString = function() {
            return this.s;
          };
          this.setString = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = t4;
            this.hV = stohex(t4);
          };
          this.setByDateValue = function(t4, e3, r3, i3, n22, s22) {
            var a22 = new Date(Date.UTC(t4, e3 - 1, r3, i3, n22, s22, 0));
            this.setByDate(a22);
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
        };
        vt2.lang.extend(pt2.asn1.DERAbstractTime, pt2.asn1.ASN1Object);
        pt2.asn1.DERAbstractStructured = function(t3) {
          pt2.asn1.DERAbstractString.superclass.constructor.call(this);
          this.setByASN1ObjectArray = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array = t4;
          };
          this.appendASN1Object = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array.push(t4);
          };
          this.asn1Array = new Array();
          if ("undefined" != typeof t3) {
            if ("undefined" != typeof t3["array"])
              this.asn1Array = t3["array"];
          }
        };
        vt2.lang.extend(pt2.asn1.DERAbstractStructured, pt2.asn1.ASN1Object);
        pt2.asn1.DERBoolean = function() {
          pt2.asn1.DERBoolean.superclass.constructor.call(this);
          this.hT = "01";
          this.hTLV = "0101ff";
        };
        vt2.lang.extend(pt2.asn1.DERBoolean, pt2.asn1.ASN1Object);
        pt2.asn1.DERInteger = function(t3) {
          pt2.asn1.DERInteger.superclass.constructor.call(this);
          this.hT = "02";
          this.setByBigInteger = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = pt2.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
          };
          this.setByInteger = function(t4) {
            var e3 = new C2(String(t4), 10);
            this.setByBigInteger(e3);
          };
          this.setValueHex = function(t4) {
            this.hV = t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if ("undefined" != typeof t3) {
            if ("undefined" != typeof t3["bigint"])
              this.setByBigInteger(t3["bigint"]);
            else if ("undefined" != typeof t3["int"])
              this.setByInteger(t3["int"]);
            else if ("number" == typeof t3)
              this.setByInteger(t3);
            else if ("undefined" != typeof t3["hex"])
              this.setValueHex(t3["hex"]);
          }
        };
        vt2.lang.extend(pt2.asn1.DERInteger, pt2.asn1.ASN1Object);
        pt2.asn1.DERBitString = function(t3) {
          if (void 0 !== t3 && "undefined" !== typeof t3.obj) {
            var e3 = pt2.asn1.ASN1Util.newObject(t3.obj);
            t3.hex = "00" + e3.getEncodedHex();
          }
          pt2.asn1.DERBitString.superclass.constructor.call(this);
          this.hT = "03";
          this.setHexValueIncludingUnusedBits = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = t4;
          };
          this.setUnusedBitsAndHexValue = function(t4, e4) {
            if (t4 < 0 || 7 < t4)
              throw "unused bits shall be from 0 to 7: u = " + t4;
            var r3 = "0" + t4;
            this.hTLV = null;
            this.isModified = true;
            this.hV = r3 + e4;
          };
          this.setByBinaryString = function(t4) {
            t4 = t4.replace(/0+$/, "");
            var e4 = 8 - t4.length % 8;
            if (8 == e4)
              e4 = 0;
            for (var r3 = 0; r3 <= e4; r3++)
              t4 += "0";
            var i3 = "";
            for (var r3 = 0; r3 < t4.length - 1; r3 += 8) {
              var n22 = t4.substr(r3, 8);
              var s22 = parseInt(n22, 2).toString(16);
              if (1 == s22.length)
                s22 = "0" + s22;
              i3 += s22;
            }
            this.hTLV = null;
            this.isModified = true;
            this.hV = "0" + e4 + i3;
          };
          this.setByBooleanArray = function(t4) {
            var e4 = "";
            for (var r3 = 0; r3 < t4.length; r3++)
              if (true == t4[r3])
                e4 += "1";
              else
                e4 += "0";
            this.setByBinaryString(e4);
          };
          this.newFalseArray = function(t4) {
            var e4 = new Array(t4);
            for (var r3 = 0; r3 < t4; r3++)
              e4[r3] = false;
            return e4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if ("undefined" != typeof t3) {
            if ("string" == typeof t3 && t3.toLowerCase().match(/^[0-9a-f]+$/))
              this.setHexValueIncludingUnusedBits(t3);
            else if ("undefined" != typeof t3["hex"])
              this.setHexValueIncludingUnusedBits(t3["hex"]);
            else if ("undefined" != typeof t3["bin"])
              this.setByBinaryString(t3["bin"]);
            else if ("undefined" != typeof t3["array"])
              this.setByBooleanArray(t3["array"]);
          }
        };
        vt2.lang.extend(pt2.asn1.DERBitString, pt2.asn1.ASN1Object);
        pt2.asn1.DEROctetString = function(t3) {
          if (void 0 !== t3 && "undefined" !== typeof t3.obj) {
            var e3 = pt2.asn1.ASN1Util.newObject(t3.obj);
            t3.hex = e3.getEncodedHex();
          }
          pt2.asn1.DEROctetString.superclass.constructor.call(this, t3);
          this.hT = "04";
        };
        vt2.lang.extend(pt2.asn1.DEROctetString, pt2.asn1.DERAbstractString);
        pt2.asn1.DERNull = function() {
          pt2.asn1.DERNull.superclass.constructor.call(this);
          this.hT = "05";
          this.hTLV = "0500";
        };
        vt2.lang.extend(pt2.asn1.DERNull, pt2.asn1.ASN1Object);
        pt2.asn1.DERObjectIdentifier = function(t3) {
          var e3 = function(t4) {
            var e4 = t4.toString(16);
            if (1 == e4.length)
              e4 = "0" + e4;
            return e4;
          };
          var r3 = function(t4) {
            var r4 = "";
            var i3 = new C2(t4, 10);
            var n22 = i3.toString(2);
            var s22 = 7 - n22.length % 7;
            if (7 == s22)
              s22 = 0;
            var a22 = "";
            for (var o22 = 0; o22 < s22; o22++)
              a22 += "0";
            n22 = a22 + n22;
            for (var o22 = 0; o22 < n22.length - 1; o22 += 7) {
              var u22 = n22.substr(o22, 7);
              if (o22 != n22.length - 7)
                u22 = "1" + u22;
              r4 += e3(parseInt(u22, 2));
            }
            return r4;
          };
          pt2.asn1.DERObjectIdentifier.superclass.constructor.call(this);
          this.hT = "06";
          this.setValueHex = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = t4;
          };
          this.setValueOidString = function(t4) {
            if (!t4.match(/^[0-9.]+$/))
              throw "malformed oid string: " + t4;
            var i3 = "";
            var n22 = t4.split(".");
            var s22 = 40 * parseInt(n22[0]) + parseInt(n22[1]);
            i3 += e3(s22);
            n22.splice(0, 2);
            for (var a22 = 0; a22 < n22.length; a22++)
              i3 += r3(n22[a22]);
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = i3;
          };
          this.setValueName = function(t4) {
            var e4 = pt2.asn1.x509.OID.name2oid(t4);
            if ("" !== e4)
              this.setValueOidString(e4);
            else
              throw "DERObjectIdentifier oidName undefined: " + t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if (void 0 !== t3) {
            if ("string" === typeof t3)
              if (t3.match(/^[0-2].[0-9.]+$/))
                this.setValueOidString(t3);
              else
                this.setValueName(t3);
            else if (void 0 !== t3.oid)
              this.setValueOidString(t3.oid);
            else if (void 0 !== t3.hex)
              this.setValueHex(t3.hex);
            else if (void 0 !== t3.name)
              this.setValueName(t3.name);
          }
        };
        vt2.lang.extend(pt2.asn1.DERObjectIdentifier, pt2.asn1.ASN1Object);
        pt2.asn1.DEREnumerated = function(t3) {
          pt2.asn1.DEREnumerated.superclass.constructor.call(this);
          this.hT = "0a";
          this.setByBigInteger = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = pt2.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
          };
          this.setByInteger = function(t4) {
            var e3 = new C2(String(t4), 10);
            this.setByBigInteger(e3);
          };
          this.setValueHex = function(t4) {
            this.hV = t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if ("undefined" != typeof t3) {
            if ("undefined" != typeof t3["int"])
              this.setByInteger(t3["int"]);
            else if ("number" == typeof t3)
              this.setByInteger(t3);
            else if ("undefined" != typeof t3["hex"])
              this.setValueHex(t3["hex"]);
          }
        };
        vt2.lang.extend(pt2.asn1.DEREnumerated, pt2.asn1.ASN1Object);
        pt2.asn1.DERUTF8String = function(t3) {
          pt2.asn1.DERUTF8String.superclass.constructor.call(this, t3);
          this.hT = "0c";
        };
        vt2.lang.extend(pt2.asn1.DERUTF8String, pt2.asn1.DERAbstractString);
        pt2.asn1.DERNumericString = function(t3) {
          pt2.asn1.DERNumericString.superclass.constructor.call(this, t3);
          this.hT = "12";
        };
        vt2.lang.extend(pt2.asn1.DERNumericString, pt2.asn1.DERAbstractString);
        pt2.asn1.DERPrintableString = function(t3) {
          pt2.asn1.DERPrintableString.superclass.constructor.call(this, t3);
          this.hT = "13";
        };
        vt2.lang.extend(pt2.asn1.DERPrintableString, pt2.asn1.DERAbstractString);
        pt2.asn1.DERTeletexString = function(t3) {
          pt2.asn1.DERTeletexString.superclass.constructor.call(this, t3);
          this.hT = "14";
        };
        vt2.lang.extend(pt2.asn1.DERTeletexString, pt2.asn1.DERAbstractString);
        pt2.asn1.DERIA5String = function(t3) {
          pt2.asn1.DERIA5String.superclass.constructor.call(this, t3);
          this.hT = "16";
        };
        vt2.lang.extend(pt2.asn1.DERIA5String, pt2.asn1.DERAbstractString);
        pt2.asn1.DERUTCTime = function(t3) {
          pt2.asn1.DERUTCTime.superclass.constructor.call(this, t3);
          this.hT = "17";
          this.setByDate = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.date = t4;
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s);
          };
          this.getFreshValueHex = function() {
            if ("undefined" == typeof this.date && "undefined" == typeof this.s) {
              this.date = /* @__PURE__ */ new Date();
              this.s = this.formatDate(this.date, "utc");
              this.hV = stohex(this.s);
            }
            return this.hV;
          };
          if (void 0 !== t3) {
            if (void 0 !== t3.str)
              this.setString(t3.str);
            else if ("string" == typeof t3 && t3.match(/^[0-9]{12}Z$/))
              this.setString(t3);
            else if (void 0 !== t3.hex)
              this.setStringHex(t3.hex);
            else if (void 0 !== t3.date)
              this.setByDate(t3.date);
          }
        };
        vt2.lang.extend(pt2.asn1.DERUTCTime, pt2.asn1.DERAbstractTime);
        pt2.asn1.DERGeneralizedTime = function(t3) {
          pt2.asn1.DERGeneralizedTime.superclass.constructor.call(this, t3);
          this.hT = "18";
          this.withMillis = false;
          this.setByDate = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.date = t4;
            this.s = this.formatDate(this.date, "gen", this.withMillis);
            this.hV = stohex(this.s);
          };
          this.getFreshValueHex = function() {
            if (void 0 === this.date && void 0 === this.s) {
              this.date = /* @__PURE__ */ new Date();
              this.s = this.formatDate(this.date, "gen", this.withMillis);
              this.hV = stohex(this.s);
            }
            return this.hV;
          };
          if (void 0 !== t3) {
            if (void 0 !== t3.str)
              this.setString(t3.str);
            else if ("string" == typeof t3 && t3.match(/^[0-9]{14}Z$/))
              this.setString(t3);
            else if (void 0 !== t3.hex)
              this.setStringHex(t3.hex);
            else if (void 0 !== t3.date)
              this.setByDate(t3.date);
            if (true === t3.millis)
              this.withMillis = true;
          }
        };
        vt2.lang.extend(pt2.asn1.DERGeneralizedTime, pt2.asn1.DERAbstractTime);
        pt2.asn1.DERSequence = function(t3) {
          pt2.asn1.DERSequence.superclass.constructor.call(this, t3);
          this.hT = "30";
          this.getFreshValueHex = function() {
            var t4 = "";
            for (var e3 = 0; e3 < this.asn1Array.length; e3++) {
              var r3 = this.asn1Array[e3];
              t4 += r3.getEncodedHex();
            }
            this.hV = t4;
            return this.hV;
          };
        };
        vt2.lang.extend(pt2.asn1.DERSequence, pt2.asn1.DERAbstractStructured);
        pt2.asn1.DERSet = function(t3) {
          pt2.asn1.DERSet.superclass.constructor.call(this, t3);
          this.hT = "31";
          this.sortFlag = true;
          this.getFreshValueHex = function() {
            var t4 = new Array();
            for (var e3 = 0; e3 < this.asn1Array.length; e3++) {
              var r3 = this.asn1Array[e3];
              t4.push(r3.getEncodedHex());
            }
            if (true == this.sortFlag)
              t4.sort();
            this.hV = t4.join("");
            return this.hV;
          };
          if ("undefined" != typeof t3) {
            if ("undefined" != typeof t3.sortflag && false == t3.sortflag)
              this.sortFlag = false;
          }
        };
        vt2.lang.extend(pt2.asn1.DERSet, pt2.asn1.DERAbstractStructured);
        pt2.asn1.DERTaggedObject = function(t3) {
          pt2.asn1.DERTaggedObject.superclass.constructor.call(this);
          this.hT = "a0";
          this.hV = "";
          this.isExplicit = true;
          this.asn1Object = null;
          this.setASN1Object = function(t4, e3, r3) {
            this.hT = e3;
            this.isExplicit = t4;
            this.asn1Object = r3;
            if (this.isExplicit) {
              this.hV = this.asn1Object.getEncodedHex();
              this.hTLV = null;
              this.isModified = true;
            } else {
              this.hV = null;
              this.hTLV = r3.getEncodedHex();
              this.hTLV = this.hTLV.replace(/^../, e3);
              this.isModified = false;
            }
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if ("undefined" != typeof t3) {
            if ("undefined" != typeof t3["tag"])
              this.hT = t3["tag"];
            if ("undefined" != typeof t3["explicit"])
              this.isExplicit = t3["explicit"];
            if ("undefined" != typeof t3["obj"]) {
              this.asn1Object = t3["obj"];
              this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
            }
          }
        };
        vt2.lang.extend(pt2.asn1.DERTaggedObject, pt2.asn1.ASN1Object);
        var gt2 = /* @__PURE__ */ function() {
          var t3 = function(e3, r3) {
            t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
              t4.__proto__ = e4;
            } || function(t4, e4) {
              for (var r4 in e4)
                if (Object.prototype.hasOwnProperty.call(e4, r4))
                  t4[r4] = e4[r4];
            };
            return t3(e3, r3);
          };
          return function(e3, r3) {
            if ("function" !== typeof r3 && null !== r3)
              throw new TypeError("Class extends value " + String(r3) + " is not a constructor or null");
            t3(e3, r3);
            function i3() {
              this.constructor = e3;
            }
            e3.prototype = null === r3 ? Object.create(r3) : (i3.prototype = r3.prototype, new i3());
          };
        }();
        var yt2 = function(t3) {
          gt2(e3, t3);
          function e3(r3) {
            var i3 = t3.call(this) || this;
            if (r3) {
              if ("string" === typeof r3)
                i3.parseKey(r3);
              else if (e3.hasPrivateKeyProperty(r3) || e3.hasPublicKeyProperty(r3))
                i3.parsePropertiesFrom(r3);
            }
            return i3;
          }
          e3.prototype.parseKey = function(t4) {
            try {
              var e4 = 0;
              var r3 = 0;
              var i3 = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
              var n22 = i3.test(t4) ? y2.decode(t4) : w2.unarmor(t4);
              var s22 = I2.decode(n22);
              if (3 === s22.sub.length)
                s22 = s22.sub[2].sub[0];
              if (9 === s22.sub.length) {
                e4 = s22.sub[1].getHexStringValue();
                this.n = U2(e4, 16);
                r3 = s22.sub[2].getHexStringValue();
                this.e = parseInt(r3, 16);
                var a22 = s22.sub[3].getHexStringValue();
                this.d = U2(a22, 16);
                var o22 = s22.sub[4].getHexStringValue();
                this.p = U2(o22, 16);
                var u22 = s22.sub[5].getHexStringValue();
                this.q = U2(u22, 16);
                var c22 = s22.sub[6].getHexStringValue();
                this.dmp1 = U2(c22, 16);
                var l22 = s22.sub[7].getHexStringValue();
                this.dmq1 = U2(l22, 16);
                var f22 = s22.sub[8].getHexStringValue();
                this.coeff = U2(f22, 16);
              } else if (2 === s22.sub.length) {
                var h22 = s22.sub[1];
                var d22 = h22.sub[0];
                e4 = d22.sub[0].getHexStringValue();
                this.n = U2(e4, 16);
                r3 = d22.sub[1].getHexStringValue();
                this.e = parseInt(r3, 16);
              } else
                return false;
              return true;
            } catch (t5) {
              return false;
            }
          };
          e3.prototype.getPrivateBaseKey = function() {
            var t4 = { array: [new pt2.asn1.DERInteger({ int: 0 }), new pt2.asn1.DERInteger({ bigint: this.n }), new pt2.asn1.DERInteger({ int: this.e }), new pt2.asn1.DERInteger({ bigint: this.d }), new pt2.asn1.DERInteger({ bigint: this.p }), new pt2.asn1.DERInteger({ bigint: this.q }), new pt2.asn1.DERInteger({ bigint: this.dmp1 }), new pt2.asn1.DERInteger({ bigint: this.dmq1 }), new pt2.asn1.DERInteger({ bigint: this.coeff })] };
            var e4 = new pt2.asn1.DERSequence(t4);
            return e4.getEncodedHex();
          };
          e3.prototype.getPrivateBaseKeyB64 = function() {
            return d2(this.getPrivateBaseKey());
          };
          e3.prototype.getPublicBaseKey = function() {
            var t4 = new pt2.asn1.DERSequence({ array: [new pt2.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }), new pt2.asn1.DERNull()] });
            var e4 = new pt2.asn1.DERSequence({ array: [new pt2.asn1.DERInteger({ bigint: this.n }), new pt2.asn1.DERInteger({ int: this.e })] });
            var r3 = new pt2.asn1.DERBitString({ hex: "00" + e4.getEncodedHex() });
            var i3 = new pt2.asn1.DERSequence({ array: [t4, r3] });
            return i3.getEncodedHex();
          };
          e3.prototype.getPublicBaseKeyB64 = function() {
            return d2(this.getPublicBaseKey());
          };
          e3.wordwrap = function(t4, e4) {
            e4 = e4 || 64;
            if (!t4)
              return t4;
            var r3 = "(.{1," + e4 + "})( +|$\n?)|(.{1," + e4 + "})";
            return t4.match(RegExp(r3, "g")).join("\n");
          };
          e3.prototype.getPrivateKey = function() {
            var t4 = "-----BEGIN RSA PRIVATE KEY-----\n";
            t4 += e3.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
            t4 += "-----END RSA PRIVATE KEY-----";
            return t4;
          };
          e3.prototype.getPublicKey = function() {
            var t4 = "-----BEGIN PUBLIC KEY-----\n";
            t4 += e3.wordwrap(this.getPublicBaseKeyB64()) + "\n";
            t4 += "-----END PUBLIC KEY-----";
            return t4;
          };
          e3.hasPublicKeyProperty = function(t4) {
            t4 = t4 || {};
            return t4.hasOwnProperty("n") && t4.hasOwnProperty("e");
          };
          e3.hasPrivateKeyProperty = function(t4) {
            t4 = t4 || {};
            return t4.hasOwnProperty("n") && t4.hasOwnProperty("e") && t4.hasOwnProperty("d") && t4.hasOwnProperty("p") && t4.hasOwnProperty("q") && t4.hasOwnProperty("dmp1") && t4.hasOwnProperty("dmq1") && t4.hasOwnProperty("coeff");
          };
          e3.prototype.parsePropertiesFrom = function(t4) {
            this.n = t4.n;
            this.e = t4.e;
            if (t4.hasOwnProperty("d")) {
              this.d = t4.d;
              this.p = t4.p;
              this.q = t4.q;
              this.dmp1 = t4.dmp1;
              this.dmq1 = t4.dmq1;
              this.coeff = t4.coeff;
            }
          };
          return e3;
        }(ut2);
        const mt2 = { i: "3.2.1" };
        var wt2 = function() {
          function t3(t4) {
            if (void 0 === t4)
              t4 = {};
            t4 = t4 || {};
            this.default_key_size = t4.default_key_size ? parseInt(t4.default_key_size, 10) : 1024;
            this.default_public_exponent = t4.default_public_exponent || "010001";
            this.log = t4.log || false;
            this.key = null;
          }
          t3.prototype.setKey = function(t4) {
            if (this.log && this.key)
              console.warn("A key was already set, overriding existing.");
            this.key = new yt2(t4);
          };
          t3.prototype.setPrivateKey = function(t4) {
            this.setKey(t4);
          };
          t3.prototype.setPublicKey = function(t4) {
            this.setKey(t4);
          };
          t3.prototype.decrypt = function(t4) {
            try {
              return this.getKey().decrypt(t4);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.encrypt = function(t4) {
            try {
              return this.getKey().encrypt(t4);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.encryptLong = function(t4) {
            try {
              return d2(this.getKey().encryptLong(t4));
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.decryptLong = function(t4) {
            try {
              return this.getKey().decryptLong(t4);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.sign = function(t4, e3, r3) {
            try {
              return d2(this.getKey().sign(t4, e3, r3));
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.verify = function(t4, e3, r3) {
            try {
              return this.getKey().verify(t4, v2(e3), r3);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.getKey = function(t4) {
            if (!this.key) {
              this.key = new yt2();
              if (t4 && "[object Function]" === {}.toString.call(t4)) {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, t4);
                return;
              }
              this.key.generate(this.default_key_size, this.default_public_exponent);
            }
            return this.key;
          };
          t3.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey();
          };
          t3.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64();
          };
          t3.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey();
          };
          t3.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64();
          };
          t3.version = mt2.i;
          return t3;
        }();
        const St2 = wt2;
      }, 2480: () => {
      } };
      var e2 = {};
      function r2(i22) {
        var n2 = e2[i22];
        if (void 0 !== n2)
          return n2.exports;
        var s2 = e2[i22] = { id: i22, loaded: false, exports: {} };
        t2[i22].call(s2.exports, s2, s2.exports, r2);
        s2.loaded = true;
        return s2.exports;
      }
      (() => {
        r2.d = (t22, e22) => {
          for (var i22 in e22)
            if (r2.o(e22, i22) && !r2.o(t22, i22))
              Object.defineProperty(t22, i22, { enumerable: true, get: e22[i22] });
        };
      })();
      (() => {
        r2.g = function() {
          if ("object" === typeof globalThis)
            return globalThis;
          try {
            return this || new Function("return this")();
          } catch (t22) {
            if ("object" === typeof window)
              return window;
          }
        }();
      })();
      (() => {
        r2.o = (t22, e22) => Object.prototype.hasOwnProperty.call(t22, e22);
      })();
      (() => {
        r2.r = (t22) => {
          if ("undefined" !== typeof Symbol && Symbol.toStringTag)
            Object.defineProperty(t22, Symbol.toStringTag, { value: "Module" });
          Object.defineProperty(t22, "__esModule", { value: true });
        };
      })();
      (() => {
        r2.nmd = (t22) => {
          t22.paths = [];
          if (!t22.children)
            t22.children = [];
          return t22;
        };
      })();
      var i2 = r2(9021);
      return i2;
    })());
  })(gtpushMin);
  uni.invokePushCallback({
    type: "enabled"
  });
  {
    Promise.resolve().then(() => {
      uni.invokePushCallback({
        type: "clientId",
        cid: "",
        errMsg: "manifest.json->appid is required"
      });
    });
  }
  const _imports_0$1 = "/static/icon.png";
  const _sfc_main$8 = {
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      const timeOpt = vue.ref({
        timer: 0,
        expire: 1e3 * 60 * 3
      });
      const notifyOpt = vue.ref({
        trTimer: 0,
        hrTimer: 0,
        expire: 1e3,
        key_TR: TaskReminderKey$1,
        key_HR: HabitReminderKey$1,
        userId: ""
      });
      const currentReminder = vue.ref(null);
      const isBackGround = vue.ref(false);
      vue.onMounted(() => {
        const user2 = uni.getStorageSync("user");
        timeOpt.value.timer = setInterval(() => {
          Get("/Api/Common/Heartbeat");
        }, timeOpt.value.expire);
        if (user2 == "" || user2 == null)
          return;
        notifyOpt.value.userId = user2.uid;
        notifyOpt.value.trTimer = setInterval(watchReminders, notifyOpt.value.expire, notifyOpt.value.key_TR);
        notifyOpt.value.hrTimer = setInterval(watchReminders, notifyOpt.value.expire, notifyOpt.value.key_HR);
        uni.onAppHide(function() {
          isBackGround.value = true;
        });
        uni.onAppShow(function() {
          isBackGround.value = false;
        });
        plus.push.addEventListener("click", (msg) => {
          const reminder = msg.payload;
          if (isBackGround.value)
            delayToRun(() => uni.reLaunch({
              url: reminder.route,
              success: (res) => {
                plus.push.remove(msg);
                if (reminder.isTaskReminder)
                  notifyTaskWithModal(reminder, notifyTaskCallback);
              }
            }), notifyOpt.value.expire);
          else
            notifyTaskWithModal(reminder, notifyTaskCallback);
        });
        plus.push.addEventListener("receive", function(msg) {
          var platform2 = uni.getSystemInfoSync().platform;
          if (platform2 == "ios") {
            if (msg.type == "receive") {
              var content = JSON.parse(msg.content);
              plus.push.createMessage(content.content, JSON.stringify(msg.payload), { title: content.title });
            }
          } else if (platform2 == "android") {
            plus.push.createMessage(msg.content, JSON.stringify(msg.payload), { title: msg.title });
          }
        }, false);
      });
      vue.onBeforeUnmount(() => {
        clearInterval(timeOpt.value.timer);
        clearInterval(notifyOpt.value.trTimer);
        clearInterval(notifyOpt.value.hrTimer);
        uni.offPushMessage();
      });
      function watchReminders(key) {
        const reminders = uni.getStorageSync(key);
        const isTaskReminder = key == notifyOpt.value.key_TR;
        const isHabitReminder = key == notifyOpt.value.key_HR;
        if (reminders === "" || reminders == null) {
          const current = /* @__PURE__ */ new Date();
          current.setMilliseconds(0);
          if (isHabitReminder) {
            current.setHours(0);
            current.setMinutes(0);
            current.setSeconds(0);
          }
          if (isTaskReminder)
            GetCurrentTaskReminders(notifyOpt.value.userId, current, (response) => getRemindersCallback(
              response,
              reminders,
              true,
              false
            ));
          if (isHabitReminder)
            GetCurrentHabitReminders(notifyOpt.value.userId, current, (response) => getRemindersCallback(
              response,
              reminders,
              false,
              true
            ));
        }
        if (isTaskReminder) {
          for (let reminder of reminders.filter((r2) => !r2.worked)) {
            const today2 = /* @__PURE__ */ new Date();
            today2.setMilliseconds(0);
            reminder.timing = new Date(reminder.timing);
            if (today2.getTime() == reminder.timing.getTime())
              notifyTask(reminder);
          }
          if (isHabitReminder) {
            for (let reminder of reminders.filter((r2) => !r2.worked)) {
              const today2 = /* @__PURE__ */ new Date();
              today2.setMilliseconds(0);
              const reminderTime = /* @__PURE__ */ new Date(
                `${today2.getFullYear()}-${today2.getMonth()}-${today2.getDate()} ${reminder.time}`
              );
              if (!reminder.worked || (reminderTime.getTime < today2.getTime() || reminderTime.getTime() >= new Date(today2).setMinutes(today2.getMinutes() + 1)))
                continue;
              notifyHabit(reminder);
            }
          }
        }
      }
      function getRemindersCallback(response, reminders, isTaskReminder, isHabitReminder) {
        const res = response.data;
        if (!res.succeeded) {
          uni.showToast({
            title: res.message,
            icon: "none"
          });
          return;
        }
        reminders = res.data;
        for (let reminder of reminders) {
          reminder.worked = false;
          reminder.isTaskReminder = isTaskReminder;
          reminder.isHabitReminder = isHabitReminder;
        }
        if (isTaskReminder)
          uni.setStorageSync(notifyOpt.value.key_TR, reminders);
        if (isHabitReminder)
          uni.setStorageSync(notifyOpt.value.key_HR, reminders);
      }
      function notifyTaskCallback(reminder, res) {
        if (res.confirm) {
          return;
        }
        if (res.cancel) {
          reminder.worked = true;
          FinishTask(reminder.taskId);
        }
      }
      function notifyHabitCallback(reminder, res) {
        if (res.confirm) {
          return;
        }
        if (res.cancel) {
          reminder.worked = true;
          FinishHabit({
            habitId: reminder.habitId,
            finished: true,
            finishTime: today,
            day: onlyDate(today)
          });
        }
      }
      const __returned__ = { timeOpt, notifyOpt, currentReminder, isBackGround, watchReminders, getRemindersCallback, notifyTaskCallback, notifyHabitCallback, onMounted: vue.onMounted, onBeforeUnmount: vue.onBeforeUnmount, ref: vue.ref, get Get() {
        return Get;
      }, get FinishTask() {
        return FinishTask;
      }, get GetCurrentTaskReminders() {
        return GetCurrentTaskReminders;
      }, get HabitReminderKey() {
        return HabitReminderKey$1;
      }, get TaskReminderKey() {
        return TaskReminderKey$1;
      }, get delayToRun() {
        return delayToRun;
      }, get notifyHabit() {
        return notifyHabit;
      }, get notifyTask() {
        return notifyTask;
      }, get notifyTaskWithModal() {
        return notifyTaskWithModal;
      }, get onlyDate() {
        return onlyDate;
      }, get FinishHabit() {
        return FinishHabit;
      }, get GetCurrentHabitReminders() {
        return GetCurrentHabitReminders;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2);
    return vue.openBlock(), vue.createBlock(_component_uni_popup, {
      type: "top",
      ref: "popup",
      onChange: _ctx.closePopup
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              src: _imports_0$1,
              style: { "height": "30px", "width": "30px" }
            }),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(_ctx.reminder.title),
              1
              /* TEXT */
            )
          ])
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["onChange"]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "D:/repos/html+css+js/SelfSchedule/App.vue"]]);
  const _sfc_main$7 = {
    name: "UniSegmentedControl",
    emits: ["clickItem"],
    props: {
      current: {
        type: Number,
        default: 0
      },
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      activeColor: {
        type: String,
        default: "#2979FF"
      },
      inActiveColor: {
        type: String,
        default: "transparent"
      },
      styleType: {
        type: String,
        default: "button"
      }
    },
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current(val) {
        if (val !== this.currentIndex) {
          this.currentIndex = val;
        }
      }
    },
    computed: {},
    created() {
      this.currentIndex = this.current;
    },
    methods: {
      _onClick(index) {
        if (this.currentIndex !== index) {
          this.currentIndex = index;
          this.$emit("clickItem", {
            currentIndex: index
          });
        }
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass([[$props.styleType === "text" ? "segmented-control--text" : "segmented-control--button"], "segmented-control"]),
        style: vue.normalizeStyle({ borderColor: $props.styleType === "text" ? "" : $props.activeColor })
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.values, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass([[
                $props.styleType === "text" ? "" : "segmented-control__item--button",
                index === 0 && $props.styleType === "button" ? "segmented-control__item--button--first" : "",
                index === $props.values.length - 1 && $props.styleType === "button" ? "segmented-control__item--button--last" : ""
              ], "segmented-control__item"]),
              key: index,
              style: vue.normalizeStyle({ backgroundColor: index === $data.currentIndex && $props.styleType === "button" ? $props.activeColor : $props.styleType === "button" ? $props.inActiveColor : "transparent", borderColor: index === $data.currentIndex && $props.styleType === "text" || $props.styleType === "button" ? $props.activeColor : $props.inActiveColor }),
              onClick: ($event) => $options._onClick(index)
            }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "text",
                  {
                    style: vue.normalizeStyle({ color: index === $data.currentIndex ? $props.styleType === "text" ? $props.activeColor : "#fff" : $props.styleType === "text" ? "#000" : $props.activeColor }),
                    class: vue.normalizeClass(["segmented-control__text", $props.styleType === "text" && index === $data.currentIndex ? "segmented-control__item--text" : ""])
                  },
                  vue.toDisplayString(item),
                  7
                  /* TEXT, CLASS, STYLE */
                )
              ])
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-86aa1171"], ["__file", "D:/repos/html+css+js/SelfSchedule/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"]]);
  const _sfc_main$6 = {
    __name: "KCalendar",
    props: {
      currentDay: Date,
      showWay: Number,
      unchangable: Boolean
    },
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const pros = __props;
      const state = vue.reactive({
        days: [],
        current: 1,
        selectedDay: void 0,
        data: [1, 1, 1],
        transformed: false,
        duration: 750,
        moveLeft: void 0,
        view: {
          current: 2,
          expanded: false,
          rotation: "-webkit-transform: ",
          items: ["年", "月", "周", "日"]
        },
        dateStr: ""
      });
      const current = vue.ref(pros.currentDay);
      const showWay = vue.ref(pros.showWay);
      const unchangable = vue.ref(pros.unchangable);
      const emits = __emit;
      vue.onMounted(() => {
        if (current.value == void 0)
          current.value = /* @__PURE__ */ new Date();
        if (showWay.value == void 0)
          showWay.value = CalendarDisplayWay.week;
        if (unchangable.value == void 0)
          unchangable.value = false;
        state.selectedDay = new Date(current.value);
        state.days.push([], [], []);
        if (showWay.value == CalendarDisplayWay.week) {
          loadWeekDays();
        } else if (showWay.value == CalendarDisplayWay.month) {
          loadMonthDays();
        } else if (showWay.value == CalendarDisplayWay.year) {
          loadYearDays();
        } else if (showWay.value == CalendarDisplayWay.day) {
          loadDays();
        }
      });
      function weekDayShow(weekDay) {
        switch (weekDay) {
          case 0:
            return "日";
          case 1:
            return "一";
          case 2:
            return "二";
          case 3:
            return "三";
          case 4:
            return "四";
          case 5:
            return "五";
          case 6:
            return "六";
        }
      }
      function loadWeekDays() {
        const today2 = new Date(state.selectedDay);
        const day = today2.getDate();
        const weekDay = today2.getDay();
        for (let i2 = 0; i2 < state.data.length; i2++) {
          if (i2 == 1)
            continue;
          for (let j2 = 0; j2 < 7; j2++)
            state.days[i2].push({
              date: new Date(new Date(state.selectedDay).setDate(day - weekDay + (i2 - 1) * 7 + j2)),
              selected: false
            });
        }
        for (let i2 = 0; i2 <= weekDay; i2++) {
          let temp = new Date(today2);
          state.days[1].push({
            date: new Date(temp.setDate(day - weekDay + i2)),
            selected: false
          });
        }
        for (let i2 = weekDay + 1, j2 = 1; i2 < 7; i2++, j2++) {
          let temp = new Date(today2);
          state.days[1].push({
            date: new Date(temp.setDate(day + j2)),
            selected: false
          });
        }
        freshSelection();
      }
      function loadMonthDays() {
        const date = new Date(state.selectedDay);
        for (let i2 = 0; i2 < state.data.length; i2++) {
          const month = date.getMonth();
          const dateTemp = new Date(new Date(date).setMonth(month + i2 - 1));
          for (let j2 = 0; j2 < monthDays(dateTemp.getFullYear(), dateTemp.getMonth() + 1); j2++) {
            const temp = new Date(dateTemp);
            temp.setDate(j2 + 1);
            for (let k = 0; j2 == 0 && k < temp.getDay(); k++) {
              state.days[i2].push(null);
            }
            const item = {
              date: temp,
              selected: false
            };
            if (temp.getFullYear() == state.selectedDay.getFullYear()) {
              if (temp.getMonth() != state.selectedDay.getMonth() && temp.getDate() == 1)
                item.selected = true;
              else if (temp.getMonth() == state.selectedDay.getMonth()) {
                if (temp.getDate() == state.selectedDay.getDate() && temp.getFullYear() == state.selectedDay.getFullYear())
                  item.selected = true;
                else if (temp.getFullYear() != state.selectedDay.getFullYear() && temp.getDate() == 1)
                  item.selected = true;
              }
            } else if (temp.getMonth() != state.selectedDay.getMonth() && temp.getDate() == 1)
              item.selected = true;
            state.days[i2].push(item);
          }
        }
      }
      function loadYearDays() {
        const year = state.selectedDay.getFullYear();
        for (let i2 = 0; i2 < state.data.length; i2++) {
          const date = new Date((/* @__PURE__ */ new Date()).setFullYear(year + i2 - 1));
          for (let j2 = 0; j2 < 12; j2++) {
            const days = [];
            for (let k = 0; k < monthDays(date.getFullYear(), j2 + 1); k++) {
              const day = new Date(date);
              day.setDate(k + 1);
              day.setMonth(j2);
              for (let n2 = 0; k == 0 && n2 < day.getDay(); n2++)
                days.push(null);
              const item = {
                date: day
              };
              days.push(item);
            }
            state.days[i2].push(days);
          }
        }
      }
      function loadDays() {
        const date = state.selectedDay.getDate();
        for (let i2 = 0; i2 < state.data.length; i2++) {
          const temp = new Date(new Date(state.selectedDay).setDate(date + i2 - 1));
          const item = {
            date: temp,
            selected: false
          };
          item.selected = dateEquals(current.value, item.date);
          state.days[i2].push(item);
        }
      }
      function labelText() {
        const date = state.selectedDay;
        switch (showWay.value) {
          case CalendarDisplayWay.month:
          case CalendarDisplayWay.week:
            return `${date.getFullYear()}年${date.getMonth() + 1}月`;
          case CalendarDisplayWay.year:
            return `${date.getFullYear()}年`;
          case CalendarDisplayWay.day:
            return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日周${weekDayShow(date.getDay())}`;
        }
      }
      function selectDay(event, day, current2) {
        if (day == null)
          return;
        event.stopPropagation();
        state.selectedDay = new Date(day.date);
        emits("onChange", state.selectedDay);
        if (showWay.value == CalendarDisplayWay.week) {
          freshSelection();
        } else {
          const data = state.days[current2];
          for (let i2 = 0; i2 < data.length; i2++) {
            if (data[i2] == null)
              continue;
            if (data[i2].date.getFullYear() == state.selectedDay.getFullYear() && data[i2].date.getMonth() == state.selectedDay.getMonth() && data[i2].date.getDate() == state.selectedDay.getDate())
              data[i2].selected = true;
            else
              data[i2].selected = false;
          }
        }
      }
      function freshSelection() {
        const data = state.days;
        for (let i2 = 0; i2 < data.length; i2++)
          for (let j2 = 0; j2 < data[i2].length; j2++) {
            if (data[i2][j2] == null)
              continue;
            const date = data[i2][j2].date;
            data[i2][j2].selected = false;
            if (date.getDay() == state.selectedDay.getDay()) {
              data[i2][j2].selected = true;
            }
          }
      }
      function transformed(e2) {
        const detail = e2.detail;
        if (detail.source == "")
          return;
        const date = new Date(state.selectedDay);
        date.getDate();
        date.getDay();
        if (state.moveLeft == void 0)
          return;
        if (state.moveLeft) {
          if (showWay.value == CalendarDisplayWay.week) {
            state.selectedDay = new Date(date.setDate(date.getDate() - 7));
          } else if (showWay.value == CalendarDisplayWay.month) {
            date.setMonth(date.getMonth() - 1);
            if (date.getFullYear() == current.value.getFullYear() && date.getMonth() == current.value.getMonth())
              date.setDate(current.value.getDate());
            state.selectedDay = date;
          } else if (showWay.value == CalendarDisplayWay.year) {
            date.setFullYear(date.getFullYear() - 1);
            state.selectedDay = date;
          } else if (showWay.value == CalendarDisplayWay.day) {
            date.setDate(date.getDate() - 1);
            state.selectedDay = date;
          }
        } else {
          if (showWay.value == CalendarDisplayWay.week)
            state.selectedDay = new Date(date.setDate(date.getDate() + 7));
          else if (showWay.value == CalendarDisplayWay.month) {
            date.setMonth(date.getMonth() + 1);
            if (date.getFullYear() == current.value.getFullYear() && date.getMonth() == current.value.getMonth())
              date.setDate(current.value.getDate());
            state.selectedDay = date;
          } else if (showWay.value == CalendarDisplayWay.year) {
            date.setFullYear(date.getFullYear() + 1);
            state.selectedDay = date;
          } else if (showWay.value == CalendarDisplayWay.day) {
            date.setDate(date.getDate() + 1);
            state.selectedDay = date;
          }
        }
        if (showWay.value != CalendarDisplayWay.year)
          emits("onChange", state.selectedDay);
        else
          emits("onChange", current.value);
      }
      function toTransform(e2) {
        const detail = e2.detail;
        if (!state.transformed && state.moveLeft == void 0) {
          if (detail.dx > 0)
            state.moveLeft = false;
          else if (detail.dx < 0)
            state.moveLeft = true;
          state.transformed = true;
        }
      }
      function backTransform(e2) {
        e2.detail;
        changeDays(e2.detail.current);
      }
      function changeDays(index) {
        const date = state.selectedDay;
        const day = date.getDate();
        const weekDay = date.getDay();
        if (index == state.data.length - 1) {
          state.data.push(1);
          const toAdd2 = [];
          if (showWay.value == CalendarDisplayWay.week) {
            for (let i2 = 0; i2 < 7; i2++) {
              let data = {};
              data.date = new Date(new Date(date).setDate(day - weekDay + i2 + 7));
              data.selected = data.date.getDay() == state.selectedDay.getDay();
              toAdd2.push(data);
            }
          } else if (showWay.value == CalendarDisplayWay.month) {
            const temp = new Date(new Date(date).setMonth(date.getMonth() + 1));
            for (let i2 = 0; i2 < monthDays(temp.getFullYear(), temp.getMonth() + 1); i2++) {
              let data = {
                date: new Date(new Date(temp).setDate(i2 + 1)),
                selected: false
              };
              if (i2 == 0) {
                for (let j2 = 0; j2 < data.date.getDay(); j2++)
                  toAdd2.push(null);
                data.selected = true;
              }
              toAdd2.push(data);
            }
          } else if (showWay.value == CalendarDisplayWay.year) {
            const temp = new Date(new Date(date).setFullYear(date.getFullYear() + 1));
            for (let i2 = 0; i2 < 12; i2++) {
              const tempData = [];
              for (let j2 = 0; j2 < monthDays(temp.getFullYear(), i2 + 1); j2++) {
                const theDay = /* @__PURE__ */ new Date();
                theDay.setFullYear(temp.getFullYear());
                theDay.setMonth(i2);
                theDay.setDate(j2 + 1);
                for (let k = 0; j2 == 0 && k < theDay.getDay(); k++)
                  tempData.push(null);
                tempData.push({
                  date: theDay
                });
              }
              toAdd2.push(tempData);
            }
          } else if (showWay.value == CalendarDisplayWay.day) {
            toAdd2.push({
              date: new Date(new Date(date).setDate(day + 1)),
              selected: false
            });
          }
          state.days.push(toAdd2);
          state.current = state.days.length - 2;
        } else if (index == 0) {
          var toAdd = [];
          state.data.splice(0, 0, 1);
          if (showWay.value == CalendarDisplayWay.week) {
            for (let i2 = 0; i2 < 7; i2++) {
              let data = {};
              data.date = new Date(new Date(date).setDate(day - weekDay + i2 - 7));
              data.selected = data.date.getDay() == state.selectedDay.getDay();
              toAdd.push(data);
            }
          } else if (showWay.value == CalendarDisplayWay.month) {
            const temp = new Date(new Date(date).setMonth(date.getMonth() - 1));
            for (let i2 = 0; i2 < monthDays(temp.getFullYear(), temp.getMonth() + 1); i2++) {
              let data = {
                date: new Date(new Date(temp).setDate(i2 + 1)),
                selected: false
              };
              if (i2 == 0) {
                for (let j2 = 0; j2 < data.date.getDay(); j2++)
                  toAdd.push(null);
                data.selected = true;
              }
              toAdd.push(data);
            }
          } else if (showWay.value == CalendarDisplayWay.year) {
            const temp = new Date(new Date(date).setFullYear(date.getFullYear() - 1));
            for (let i2 = 0; i2 < 12; i2++) {
              const tempData = [];
              for (let j2 = 0; j2 < monthDays(temp.getFullYear(), i2 + 1); j2++) {
                const theDay = /* @__PURE__ */ new Date();
                theDay.setFullYear(temp.getFullYear());
                theDay.setMonth(i2);
                theDay.setDate(j2 + 1);
                for (let k = 0; j2 == 0 && k < theDay.getDay(); k++)
                  tempData.push(null);
                tempData.push({
                  date: theDay
                });
              }
              toAdd.push(tempData);
            }
          } else if (showWay.value == CalendarDisplayWay.day) {
            toAdd.push({
              date: new Date(new Date(date).setDate(day - 1)),
              selected: false
            });
          }
          state.days.splice(0, 0, toAdd);
          state.current = 1;
        }
        state.transformed = false;
        state.moveLeft = void 0;
      }
      function switchLeft() {
        const date = new Date(state.selectedDay);
        switch (showWay.value) {
          case CalendarDisplayWay.day:
            date.setDate(date.getDate() - 1);
            break;
          case CalendarDisplayWay.week:
            date.setDate(date.getDate() - 7);
            break;
          case CalendarDisplayWay.month:
            date.setMonth(date.getMonth() - 1);
            break;
          case CalendarDisplayWay.year:
            date.setFullYear(date.getFullYear() - 1);
            break;
        }
        changeDays(state.current--);
        state.selectedDay = date;
        if (showWay.value != CalendarDisplayWay.year)
          emits("onChange", date);
      }
      function switchRight() {
        const date = new Date(state.selectedDay);
        switch (showWay.value) {
          case CalendarDisplayWay.day:
            date.setDate(date.getDate() + 1);
            break;
          case CalendarDisplayWay.week:
            date.setDate(date.getDate() + 7);
            break;
          case CalendarDisplayWay.month:
            date.setMonth(date.getMonth() + 1);
            break;
          case CalendarDisplayWay.year:
            date.setFullYear(date.getFullYear() + 1);
            break;
        }
        changeDays(state.current++);
        state.selectedDay = date;
        if (showWay.value != CalendarDisplayWay.year)
          emits("onChange", date);
      }
      function signRotate() {
        if (state.view.expanded) {
          state.view.expanded = false;
          state.view.rotation = "";
        } else {
          state.view.expanded = true;
          state.view.rotation = "-webkit-transform:rotateX(-180deg)";
        }
      }
      function updateView(way) {
        switch (way) {
          case CalendarDisplayWay.month:
            loadMonthDays();
            break;
          case CalendarDisplayWay.week:
            loadWeekDays();
            break;
          case CalendarDisplayWay.year:
            loadYearDays();
            break;
          case CalendarDisplayWay.day:
            loadDays();
            break;
        }
      }
      function switchViewMode(item) {
        freshItems();
        state.current = 1;
        var way;
        switch (item.currentIndex) {
          case 0:
            way = CalendarDisplayWay.year;
            break;
          case 1:
            way = CalendarDisplayWay.month;
            break;
          case 2:
            way = CalendarDisplayWay.week;
            break;
          case 3:
            way = CalendarDisplayWay.day;
            break;
        }
        updateView(way);
        vue.nextTick(() => {
          if (way != CalendarDisplayWay.day)
            showWay.value = way;
          else {
            showWay.value = CalendarDisplayWay.year;
            vue.nextTick(() => showWay.value = way);
          }
        });
        state.view.current = item.currentIndex;
        emits("modeChange", way);
      }
      function goToMonth(month) {
        freshItems();
        showWay.value = CalendarDisplayWay.month;
        state.selectedDay.setMonth(month);
        if (month != current.value.getMonth()) {
          state.selectedDay.setDate(1);
        }
        updateView(showWay.value);
        state.view.current = 1;
        state.view.expanded = false;
      }
      function freshItems() {
        state.data.splice(0, state.data.length);
        state.days.splice(0, state.days.length);
        state.days.push([], [], []);
        state.data.push(1, 1, 1);
      }
      function dateChange(event) {
        const detail = event.detail;
        const date = new Date(detail.value);
        state.selectedDay.setFullYear(date.getFullYear());
        state.selectedDay.setMonth(date.getMonth());
        state.selectedDay.setDate(date.getDate());
        freshItems();
        if (showWay.value == CalendarDisplayWay.week)
          updateView(showWay.value);
        else {
          state.view.current = 2;
          state.current = 1;
          updateView(CalendarDisplayWay.week);
          vue.nextTick(() => {
            showWay.value = CalendarDisplayWay.week;
          });
        }
      }
      const __returned__ = { pros, state, current, showWay, unchangable, emits, weekDayShow, loadWeekDays, loadMonthDays, loadYearDays, loadDays, labelText, selectDay, freshSelection, transformed, toTransform, backTransform, changeDays, switchLeft, switchRight, signRotate, updateView, switchViewMode, goToMonth, freshItems, dateChange, reactive: vue.reactive, onMounted: vue.onMounted, ref: vue.ref, watch: vue.watch, nextTick: vue.nextTick, get CalendarDisplayWay() {
        return CalendarDisplayWay;
      }, get delayToRun() {
        return delayToRun;
      }, get monthDays() {
        return monthDays;
      }, get dateEquals() {
        return dateEquals;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    const _component_uni_segmented_control = resolveEasycom(vue.resolveDynamicComponent("uni-segmented-control"), __easycom_1);
    const _component_k_time_counter = vue.resolveComponent("k-time-counter");
    return vue.openBlock(), vue.createElementBlock("view", { class: "k-calendar" }, [
      $setup.state.selectedDay != void 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "title"
      }, [
        vue.createTextVNode(
          vue.toDisplayString($setup.labelText()) + " ",
          1
          /* TEXT */
        ),
        !$setup.unchangable ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "sign",
            onClick: $setup.signRotate,
            style: vue.normalizeStyle($setup.state.view.rotation)
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "select-date" }, [
          vue.createElementVNode("picker", {
            mode: "date",
            value: $setup.state.dateStr,
            start: "1970-01-01",
            onChange: $setup.dateChange,
            onCancel: _cache[0] || (_cache[0] = ($event) => $setup.state.dateStr = "")
          }, [
            vue.createVNode(_component_uni_icons, { type: "paperplane" })
          ], 40, ["value"])
        ]),
        vue.createElementVNode("view", { class: "switch" }, [
          vue.createVNode(_component_uni_icons, {
            type: "left",
            size: 16,
            onClick: $setup.switchLeft
          }),
          vue.createVNode(_component_uni_icons, {
            type: "right",
            size: 16,
            onClick: $setup.switchRight
          })
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $setup.state.view.expanded ? (vue.openBlock(), vue.createBlock(_component_uni_segmented_control, {
        key: 1,
        "style-type": "text",
        values: $setup.state.view.items,
        current: $setup.state.view.current,
        onClickItem: $setup.switchViewMode,
        style: { "margin-bottom": "5px" }
      }, null, 8, ["values", "current"])) : vue.createCommentVNode("v-if", true),
      $setup.showWay == $setup.CalendarDisplayWay.week ? (vue.openBlock(), vue.createElementBlock("swiper", {
        key: 2,
        current: $setup.state.current,
        onTransition: $setup.toTransform,
        onChange: $setup.transformed,
        duration: $setup.state.duration,
        onAnimationfinish: $setup.backTransform,
        style: { "height": "fit-content)" }
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.state.data, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
              vue.createElementVNode("view", { class: "header" }, [
                vue.createElementVNode("view", { class: "day-label" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.state.days[index], (weekDay, index1) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: index1,
                        class: "week"
                      }, [
                        vue.createElementVNode(
                          "text",
                          { class: "day-text" },
                          vue.toDisplayString($setup.weekDayShow(weekDay.date.getDay())),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("text", {
                          onClick: ($event) => $setup.selectDay($event, weekDay, index),
                          style: vue.normalizeStyle(weekDay.selected ? "border-color:rgb(36, 155, 221)" : ""),
                          class: vue.normalizeClass(weekDay.date.getTime() == $setup.current.getTime() ? "date date-today" : "date")
                        }, vue.toDisplayString(weekDay.date.getDate()), 15, ["onClick"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 40, ["current", "duration"])) : vue.createCommentVNode("v-if", true),
      $setup.showWay == $setup.CalendarDisplayWay.month ? (vue.openBlock(), vue.createElementBlock("swiper", {
        key: 3,
        current: $setup.state.current,
        onTransition: $setup.toTransform,
        onChange: $setup.transformed,
        onAnimationfinish: $setup.backTransform,
        style: { "height": "230px" }
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.state.data, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
              vue.createElementVNode("view", { class: "day-label" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(["日", "一", "二", "三", "四", "五", "六"], (day, index1) => {
                    return vue.createElementVNode(
                      "text",
                      {
                        class: "day-text",
                        key: index1
                      },
                      vue.toDisplayString(day),
                      1
                      /* TEXT */
                    );
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("view", { class: "month" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.state.days[index], (day, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index2,
                      class: "month-container"
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(day != null && day.date.getTime() == $setup.current.getTime() ? "date date-today" : "date"),
                        onClick: ($event) => $setup.selectDay($event, day, index),
                        style: vue.normalizeStyle(day != null && day.selected ? "border-color:rgb(36, 155, 221)" : "")
                      }, vue.toDisplayString(day != null ? day.date.getDate() : ""), 15, ["onClick"])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 40, ["current"])) : vue.createCommentVNode("v-if", true),
      $setup.showWay == $setup.CalendarDisplayWay.year ? (vue.openBlock(), vue.createElementBlock("swiper", {
        key: 4,
        current: $setup.state.current,
        onTransition: $setup.toTransform,
        onChange: $setup.transformed,
        onAnimationfinish: $setup.backTransform,
        style: { "height": "600px" }
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.state.data, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
              vue.createElementVNode("view", { class: "year" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.state.days[index], (monthDays2, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "year-item",
                      key: index2,
                      onClick: ($event) => $setup.goToMonth(index2)
                    }, [
                      vue.createElementVNode(
                        "h4",
                        null,
                        vue.toDisplayString(index2 + 1) + "月",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "day-label" }, [
                        (vue.openBlock(), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(["日", "一", "二", "三", "四", "五", "六"], (day, index1) => {
                            return vue.createElementVNode(
                              "text",
                              {
                                class: "day-text",
                                key: index1
                              },
                              vue.toDisplayString(day),
                              1
                              /* TEXT */
                            );
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("view", { class: "month" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(monthDays2, (day, index3) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              key: index3,
                              class: "month-container"
                            }, [
                              vue.createElementVNode(
                                "view",
                                {
                                  class: vue.normalizeClass(day != null && $setup.dateEquals(day.date, $setup.current) ? "date date-today" : "date"),
                                  style: vue.normalizeStyle(day != null && $setup.dateEquals(day.date, $setup.state.selectedDay) && !$setup.dateEquals(day.date, $setup.current) ? "border-color:rgb(36, 155, 221)" : "")
                                },
                                vue.toDisplayString(day != null ? day.date.getDate() : ""),
                                7
                                /* TEXT, CLASS, STYLE */
                              )
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 40, ["current"])) : vue.createCommentVNode("v-if", true),
      $setup.showWay == $setup.CalendarDisplayWay.day ? (vue.openBlock(), vue.createElementBlock("swiper", {
        key: 5,
        current: $setup.state.current,
        onTransition: $setup.toTransform,
        onChange: $setup.transformed,
        onAnimationfinish: $setup.backTransform
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.state.data, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", {
              key: index,
              style: { "height": "50px", "background-color": "aliceblue" }
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.state.days[index], (day, index1) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index1,
                    style: { "font-size": "18px", "text-align": "center", "line-height": "50px" }
                  }, [
                    day.selected ? (vue.openBlock(), vue.createBlock(_component_k_time_counter, { key: 0 })) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 40, ["current"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const KCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-517b2787"], ["__file", "D:/repos/html+css+js/SelfSchedule/components/KCalendar.vue"]]);
  const _sfc_main$5 = {
    __name: "KTimeCounter",
    props: {
      date: Date,
      interval: Number,
      countdown: Boolean
    },
    setup(__props, { expose: __expose }) {
      const pros = __props;
      const date = vue.ref(pros.date);
      const interavl = vue.ref(pros.interval);
      const countdown = vue.ref(pros.countdown);
      const state = vue.reactive({
        timer: 0,
        date: void 0,
        stopped: false,
        timeStr: ""
      });
      vue.onMounted(() => {
        if (countdown.value == void 0)
          countdown.value = false;
        if (date.value == void 0)
          date.value = /* @__PURE__ */ new Date();
        if (interavl.value == void 0)
          interavl.value = 1e3;
        state.date = date.value;
        state.timeStr = timeStr();
        state.timer = setInterval(() => {
          if (state.stopped)
            return;
          const second = state.date.getSeconds();
          if (countdown.value)
            state.date.setSeconds(second - 1);
          else
            state.date.setSeconds(second + 1);
          state.timeStr = timeStr();
        }, interavl.value);
      });
      function timeStr() {
        const str = state.date.toLocaleTimeString();
        return str.substring(0, str.indexOf(" "));
      }
      vue.onBeforeUnmount(() => {
        state.stopped = true;
        clearInterval(state.timer);
      });
      function start() {
        state.stopped = false;
        state.date = /* @__PURE__ */ new Date();
      }
      function stop() {
        state.stopped = true;
      }
      __expose({
        start,
        stop
      });
      const __returned__ = { pros, date, interavl, countdown, state, timeStr, start, stop, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, onBeforeUnmount: vue.onBeforeUnmount };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "k-time-counter" }, [
      $setup.state.date != void 0 ? (vue.openBlock(), vue.createElementBlock(
        "text",
        { key: 0 },
        vue.toDisplayString($setup.state.timeStr),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const KTimeCounter = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "D:/repos/html+css+js/SelfSchedule/components/KTimeCounter.vue"]]);
  const _sfc_main$4 = {
    __name: "KSplit",
    props: {
      width: Number,
      height: Number,
      backgroundColor: String,
      boderRadius: Number,
      unit: String
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const pros = __props;
      const width = vue.ref(pros.width);
      const height = vue.ref(pros.height);
      const backgroundColor = vue.ref(pros.backgroundColor);
      const borderRadius = vue.ref(pros.boderRadius);
      const unit = vue.ref(pros.unit);
      const style = vue.ref("");
      vue.onMounted(() => {
        if (unit.value == void 0)
          unit.value = "px";
        if (width.value == void 0)
          width.value = 0;
        if (height.value == void 0)
          height.value = 0;
        if (backgroundColor.value == void 0)
          backgroundColor.value = "#2979ff";
        if (borderRadius.value == void 0)
          borderRadius.value = 10;
        style.value = `width:${width.value + unit.value};height:${height.value + unit.value};
		background-color:${backgroundColor.value};border-radius:${borderRadius.value + unit.value}`;
      });
      const __returned__ = { pros, width, height, backgroundColor, borderRadius, unit, style, onMounted: vue.onMounted, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "k-split" }, [
      vue.createElementVNode(
        "view",
        {
          style: vue.normalizeStyle($setup.style)
        },
        null,
        4
        /* STYLE */
      )
    ]);
  }
  const KSplit = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-b2760bcc"], ["__file", "D:/repos/html+css+js/SelfSchedule/components/KSplit.vue"]]);
  const _sfc_main$3 = {
    __name: "KRdaioGroup",
    props: {
      data: Array,
      modelValue: Number,
      containDef: Boolean,
      checkMode: Boolean
    },
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const emit = __emit;
      const pros = __props;
      const data = vue.ref(pros.data);
      const containDef = vue.ref(pros.containDef);
      const checkMode = vue.ref(pros.checkMode);
      const defRadio = vue.ref(null);
      const model = vue.ref(pros.modelValue);
      function select(e2) {
        const detail = e2.detail;
        emit("update:modelValue", detail.value);
        var item = {};
        item.value = detail.value;
        if (containDef.value) {
          item.isDef = detail.value == data.value.length;
        }
        emit("onChange", item);
      }
      vue.onMounted(function() {
        if (containDef.value == void 0)
          containDef.value = false;
        if (checkMode.value == void 0)
          checkMode.value = false;
        if (checkMode.value)
          model.value = [];
      });
      const __returned__ = { emit, pros, data, containDef, checkMode, defRadio, model, select, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "k-popup-radio" }, [
      $setup.checkMode ? (vue.openBlock(), vue.createElementBlock(
        "checkbox-group",
        {
          key: 0,
          onChange: $setup.select
        },
        [
          vue.createVNode(_component_uni_list, null, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.data, (item, index) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_list_item,
                    { key: index },
                    {
                      body: vue.withCtx(() => [
                        $setup.checkMode ? (vue.openBlock(), vue.createElementBlock("label", {
                          key: 0,
                          class: "check"
                        }, [
                          vue.createElementVNode("checkbox", {
                            value: item.value,
                            style: { "transform": "scale(0.7)" },
                            checked: $setup.model.indexOf(item.value) > 0
                          }, null, 8, ["value", "checked"]),
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(item.text),
                            1
                            /* TEXT */
                          )
                        ])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ],
        32
        /* NEED_HYDRATION */
      )) : vue.createCommentVNode("v-if", true),
      !$setup.checkMode ? (vue.openBlock(), vue.createElementBlock(
        "radio-group",
        {
          key: 1,
          onChange: $setup.select
        },
        [
          vue.createVNode(_component_uni_list, null, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.data, (item, index) => {
                  return vue.openBlock(), vue.createBlock(
                    _component_uni_list_item,
                    { key: index },
                    {
                      body: vue.withCtx(() => [
                        !$setup.checkMode ? (vue.openBlock(), vue.createElementBlock("label", {
                          key: 0,
                          class: "radio"
                        }, [
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(item.text),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("radio", {
                            value: item.value,
                            style: { "transform": "scale(0.7)" },
                            checked: item.value == $props.modelValue
                          }, null, 8, ["value", "checked"])
                        ])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              $setup.containDef ? (vue.openBlock(), vue.createBlock(_component_uni_list_item, { key: 0 }, {
                body: vue.withCtx(() => [
                  !$setup.checkMode ? (vue.openBlock(), vue.createElementBlock("label", {
                    key: 0,
                    class: "radio"
                  }, [
                    vue.createElementVNode("text", null, "自定义"),
                    vue.createElementVNode("radio", {
                      value: $setup.data.length,
                      style: { "transform": "scale(0.7)" },
                      ref: "defRadio",
                      checked: $props.modelValue == $setup.data.length
                    }, null, 8, ["value", "checked"])
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ],
        32
        /* NEED_HYDRATION */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const KRdaioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-84a60277"], ["__file", "D:/repos/html+css+js/SelfSchedule/components/KRdaioGroup.vue"]]);
  const _sfc_main$2 = {
    __name: "KHabitGroup",
    props: {
      modelValue: Array
    },
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const pros = __props;
      const emits = __emit;
      const popup = vue.ref(null);
      const data = vue.ref(pros.modelValue);
      const state = vue.reactive({
        groupName: "",
        canAdd: false,
        userId: "",
        isUpdate: false
      });
      vue.onMounted(function() {
        state.userId = uni.getStorageSync("user").uid;
      });
      function toEdit(group) {
        state.groupName = group.name;
        state.isUpdate = true;
        popup.value.open();
      }
      function remove(index) {
        const group = data.value[index];
        RemoveGroup(group.id, state.userId, group.code, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          data.value.splice(index, 1);
          emits("modelValue:update", data.value);
        });
      }
      function createGroup() {
        if (!state.canAdd)
          return;
        CreateGroup(state.userId, state.groupName, (response) => {
          const res = response.data;
          if (!res.succeeded) {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            return;
          }
          const group = {
            id: res.data,
            name: state.groupName,
            userId: state.userId
          };
          data.value.push(group);
          popup.value.close();
          emits("modelValue:update", data.value);
        });
      }
      function check(value) {
        value = value.trimStart().trimEnd();
        state.canAdd = value.length > 0;
      }
      function popupClose(e2) {
        if (e2.show)
          return;
        state.groupName = "";
        state.canAdd = false;
        state.isUpdate = false;
      }
      const __returned__ = { pros, emits, popup, data, state, toEdit, remove, createGroup, check, popupClose, reactive: vue.reactive, ref: vue.ref, onMounted: vue.onMounted, get CreateGroup() {
        return CreateGroup;
      }, get RemoveGroup() {
        return RemoveGroup;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_1$5);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "k-habit-group" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.data, (group, index) => {
              return vue.openBlock(), vue.createElementBlock("view", { class: "k-habit-group-item" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(group.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { style: { "padding": "1%" } }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "compose",
                    size: 20,
                    onClick: ($event) => $setup.toEdit(group),
                    style: { "margin-right": "5px" }
                  }, null, 8, ["onClick"]),
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    onClick: ($event) => $setup.remove(index),
                    size: 20
                  }, null, 8, ["onClick"])
                ])
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          )),
          vue.createElementVNode("view", {
            class: "k-habit-group-item",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.popup.open())
          }, [
            vue.createElementVNode("view", { style: { "height": "40px", "line-height": "40px" } }, [
              vue.createVNode(_component_uni_icons, {
                type: "plusempty",
                size: 20,
                color: "rgb(0, 75, 235)"
              }),
              vue.createElementVNode("text", { style: { "color": "rgb(0, 75, 235)" } }, "添加分组")
            ])
          ])
        ]),
        vue.createVNode(
          _component_uni_popup,
          {
            type: "center",
            ref: "popup",
            "background-color": "#fff",
            onChange: $setup.popupClose,
            "border-radius": "8px 8px 8px 8px"
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "edit-group" }, [
                vue.createElementVNode(
                  "text",
                  { class: "title" },
                  vue.toDisplayString($setup.state.isUpdate ? "编辑分组" : "添加分组"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { style: { "width": "90%" } }, [
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $setup.state.groupName,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.state.groupName = $event),
                    onInput: $setup.check,
                    style: { "height": "30px" },
                    placeholder: "习惯分组名称",
                    focus: ""
                  }, null, 8, ["modelValue"])
                ]),
                vue.createElementVNode("view", { class: "func-text" }, [
                  vue.createElementVNode(
                    "text",
                    {
                      onClick: $setup.createGroup,
                      style: vue.normalizeStyle($setup.state.canAdd ? "" : "opacity:0.3")
                    },
                    "确定",
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("text", {
                    onClick: _cache[2] || (_cache[2] = ($event) => $setup.popup.close()),
                    style: { "margin-left": "15px", "margin-right": "15px" }
                  }, "取消")
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const KHabitGroup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-a4133cde"], ["__file", "D:/repos/html+css+js/SelfSchedule/components/KHabitGroup.vue"]]);
  const _sfc_main$1 = {
    __name: "KSwiper",
    props: {
      backgroundColor: String,
      height: Number,
      width: Number
    },
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const pros = __props;
      const swiper = vue.ref(null);
      const emits = __emit;
      const state = vue.reactive({
        style: {
          width: "80%",
          height: "40px",
          borderRadius: "50px"
        },
        scrollStyle: "",
        scrollBaseStyle: "",
        lastXPos: 0,
        canMove: false,
        startX: null
      });
      const backgroundColor = vue.ref(pros.backgroundColor);
      const width = vue.ref(pros.width);
      const height = vue.ref(pros.height);
      function scrollWidth() {
        return height.value * 1.1 / 2;
      }
      vue.onMounted(function() {
        if (backgroundColor.value == void 0)
          backgroundColor.value = "rgba(0,0,0,.5)";
        if (width.value == void 0)
          width.value = "80%";
        else
          state.style.width = width.value + "px";
        if (height.value == void 0)
          height.value = "40";
        state.style.backgroundColor = backgroundColor.value;
        state.style.height = height.value + "px";
        state.scrollBaseStyle = `height:${height.value * 1.1}px;width:${height.value * 1.1}px`;
        state.scrollStyle = state.scrollBaseStyle;
        vue.nextTick(() => {
          getElBound(".k-swiper", (res) => {
            width.value = res[0].width;
          });
        });
      });
      function start(e2) {
        state.canMove = true;
        state.startX = e2.touches[0].pageX;
      }
      function move(e2) {
        const point = e2.touches[0];
        state.lastXPos = point.pageX - state.startX;
        if (state.canMove) {
          if (state.lastXPos >= 0 && state.lastXPos < width.value - height.value)
            state.scrollStyle = `${state.scrollBaseStyle};-webkit-transform: translate(${state.lastXPos}px,-50%);`;
          if (state.lastXPos < 0 && state.startX + state.lastXPos > 0)
            state.scrollStyle = `${state.scrollBaseStyle};
				  -webkit-transform: translate(${state.startX + state.lastXPos - height.value}px,-50%);`;
        }
      }
      function end(e2) {
        const event = {};
        if (state.lastXPos < 0.4 * width.value) {
          state.scrollStyle = `${state.scrollBaseStyle};-webkit-transform: translate(0,-50%);`;
          event.finished = false;
        } else {
          state.scrollStyle = `${state.scrollBaseStyle};-webkit-transform: translate(${width.value - height.value / 2}px,-50%);`;
          event.finished = true;
        }
        emits("finish", event);
        state.canMove = false;
      }
      const __returned__ = { pros, swiper, emits, state, backgroundColor, width, height, scrollWidth, start, move, end, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, get delayToRun() {
        return delayToRun;
      }, get getElBound() {
        return getElBound;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "k-swiper",
        style: vue.normalizeStyle($setup.state.style),
        ref: "swiper"
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: $setup.start,
            onTouchmove: $setup.move,
            onTouchend: $setup.end,
            style: vue.normalizeStyle($setup.state.scrollStyle),
            class: "scroll"
          },
          null,
          36
          /* STYLE, NEED_HYDRATION */
        )
      ],
      4
      /* STYLE */
    );
  }
  const KSwiper = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-38f6fe7f"], ["__file", "D:/repos/html+css+js/SelfSchedule/components/KSwiper.vue"]]);
  const _imports_0 = "/static/percentage.png";
  const _imports_1 = "/static/完成.png";
  const _imports_2 = "/static/曲线图2.png";
  const _imports_3 = "/static/连续.png";
  const _sfc_main = {
    __name: "KRecordMonth",
    props: {
      modelValue: Array,
      beginDate: Date,
      habitId: String,
      current: Date,
      continuousDays: Number,
      mostDays: Number,
      persistDays: Number,
      frequency: Object
    },
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const pros = __props;
      const emits = __emit;
      const today2 = vue.ref(onlyDate(/* @__PURE__ */ new Date()));
      const state = vue.reactive({
        data: new Array(3),
        current: 1,
        days: [
          [],
          [],
          []
        ],
        moveLeft: void 0,
        transformed: false,
        daysFromBeginDateToNow: 0
      });
      const records = vue.ref(pros.modelValue);
      const beginDate = vue.ref(pros.beginDate);
      const habitId = vue.ref(pros.habitId);
      const current = vue.ref(pros.current);
      const continuousDays = vue.ref(pros.continuousDays);
      const mostDays = vue.ref(pros.mostDays);
      const persistDays2 = vue.ref(pros.persistDays);
      const frequency2 = vue.ref(pros.frequency);
      vue.onMounted(() => {
        const today3 = onlyDate(/* @__PURE__ */ new Date());
        if (beginDate.value == void 0)
          beginDate.value = today3;
        loadMonthDays();
        state.daysFromBeginDateToNow = (today3.getTime() - beginDate.value.getTime()) / ADayMillseconds + 1;
      });
      function loadMonthDays() {
        const date = new Date(current.value);
        for (let i2 = 0; i2 < state.data.length; i2++) {
          const month = date.getMonth();
          const dateTemp = new Date(new Date(date).setMonth(month + i2 - 1));
          for (let j2 = 0; j2 < monthDays(dateTemp.getFullYear(), dateTemp.getMonth() + 1); j2++) {
            const temp = new Date(dateTemp);
            temp.setDate(j2 + 1);
            for (let k = 0; j2 == 0 && k < temp.getDay(); k++) {
              state.days[i2].push(null);
            }
            const index = records.value.findIndex((r2) => r2.day.getTime() == onlyDate(temp).getTime());
            const day = {
              date: temp,
              class: "date",
              record: {
                index,
                result: index >= 0
              }
            };
            if (day.record.result)
              day.class = records.value[day.record.index].finished ? "date finished" : "date unfinished";
            state.days[i2].push(day);
          }
        }
      }
      function select(day) {
        if (day.record.result) {
          const record = records.value[day.record.index];
          DayInFrequency(habitId.value, day.date.getTime(), beginDate.value.getTime(), (response) => {
            const res = response.data;
            if (!res.succeeded) {
              uni.showToast({
                title: res.message,
                icon: "none"
              });
              return;
            }
            if (!res.data) {
              uni.showToast({
                title: "非习惯执行频率区段或在当前习惯执行频率区段中，习惯已执行完毕",
                icon: "none"
              });
              return;
            }
            uni.showModal({
              content: "完成/不完成",
              confirmText: "完成",
              cancelText: "不完成",
              success: (res2) => {
                const model = {};
                copy(record, model);
                if (res2.confirm) {
                  if (record.finsihed)
                    return;
                  model.finished = true;
                }
                if (res2.cancel) {
                  if (!record.finished)
                    return;
                  model.finished = false;
                }
                model.finishTime = model.finished ? /* @__PURE__ */ new Date() : null;
                model.habitId = habitId.value;
                FinishOrNot(model, (response2) => {
                  if (!response2.data.succeeded) {
                    uni.showToast({
                      title: response2.data.message,
                      icon: "none"
                    });
                    return;
                  }
                  const data = response2.data.data;
                  record.finished = model.finished;
                  record.finishTime = model.finishTime;
                  persistDays2.value = data.persistDays;
                  mostDays.value = data.mostDays;
                  continuousDays.value = data.continuousDays;
                  day.class = record.finished ? "date finished" : "date unfinished";
                  emits("update:modelValue", records.value);
                  emits("select", data);
                });
              }
            });
          });
        } else {
          const date = onlyDate(day.date);
          if (date.getTime() <= today2.value.getTime() && date.getTime() >= beginDate.value.getTime()) {
            DayInFrequency(habitId.value, day.date.getTime(), beginDate.value.getTime(), (response) => {
              const res = response.data;
              if (!res.succeeded) {
                uni.showToast({
                  title: res.message,
                  icon: "none"
                });
                return;
              }
              if (!res.data) {
                uni.showToast({
                  title: "在当前习惯执行频率区段中，习惯已执行完毕",
                  icon: "none"
                });
                return;
              }
              uni.showModal({
                content: "是否完成",
                confirmText: "完成",
                cancelText: "不完成",
                success: (result) => {
                  var finished;
                  if (result.confirm)
                    finished = true;
                  if (result.cancel)
                    finished = false;
                  const record = {
                    habitId: habitId.value,
                    day: onlyDate(day.date),
                    finished,
                    finishTime: finished ? /* @__PURE__ */ new Date() : null
                  };
                  FinishOrNot(record, (response1) => {
                    const res1 = response1.data;
                    if (!res1.succeeded) {
                      uni.showToast({
                        title: res1.message,
                        icon: "none"
                      });
                      return;
                    }
                    const data = res1.data;
                    records.value.push(record);
                    day.class = record.finished ? "date finished" : "date unfinished";
                    persistDays2.value = data.persistDays;
                    mostDays.value = data.mostDays;
                    continuousDays.value = data.continuousDays;
                    emits("update:modelValue", records.value);
                    emits("select", data);
                  });
                }
              });
            });
          }
        }
      }
      function toTransform(e2) {
        const detail = e2.detail;
        if (!state.transformed && state.moveLeft == void 0) {
          if (detail.dx < 0)
            state.moveLeft = true;
          else if (detail.dx > 0)
            state.moveLeft = false;
          state.transformed = true;
        }
      }
      function backTransform(e2) {
        const detail = e2.detail;
        changeMonthDays(detail.current);
      }
      function transformed(e2) {
        const detail = e2.detail;
        if (detail.source == "")
          return;
        if (state.moveLeft == void 0)
          return;
        const date = new Date(current.value);
        if (state.moveLeft)
          date.setMonth(date.getMonth() - 1);
        else
          date.setMonth(date.getMonth() + 1);
        current.value = date;
        state.transformed = false;
      }
      function selectDate(e2) {
        current.value = new Date(e2.detail.value);
      }
      function transformLeft() {
        const date = new Date(current.value);
        date.setMonth(date.getMonth() - 1);
        changeMonthDays(state.current--);
        current.value = date;
      }
      function transformRight() {
        const date = new Date(current.value);
        date.setMonth(date.getMonth() + 1);
        changeMonthDays(state.current++);
        current.value = date;
      }
      function changeMonthDays(index) {
        const toAdd = [];
        const date = current.value;
        if (index == state.data.length - 1) {
          state.data.push({});
          const temp = new Date(new Date(date).setMonth(date.getMonth() + 1));
          const index2 = records.value.findIndex((r2) => r2.day.getTime() == temp.getTime());
          for (let i2 = 0; i2 < monthDays(temp.getFullYear(), temp.getMonth() + 1); i2++) {
            let data = {
              date: new Date(new Date(temp).setDate(i2 + 1)),
              class: "date",
              record: {
                index: index2,
                result: index2 >= 0
              }
            };
            if (data.record.result)
              data.class = records.value[data.record.index].finished ? "date finished" : "date unfinished";
            if (i2 == 0) {
              for (let j2 = 0; j2 < data.date.getDay(); j2++)
                toAdd.push(null);
            }
            toAdd.push(data);
          }
          state.current = state.data.length - 2;
          state.days.push(toAdd);
        }
        if (index == 0) {
          const temp = new Date(new Date(date).setMonth(date.getMonth() - 1));
          const index1 = records.value.findIndex((r2) => r2.day.getTime() == temp.getTime());
          state.data.splice(0, 0, {});
          for (let i2 = 0; i2 < monthDays(temp.getFullYear(), temp.getMonth() + 1); i2++) {
            let data = {
              date: new Date(new Date(temp).setDate(i2 + 1)),
              class: "date",
              record: {
                index: index1,
                result: index >= 0
              }
            };
            if (data.record.result)
              data.class = records.value[data.record.index].finished ? "date finished" : "date unfinished";
            if (i2 == 0) {
              for (let j2 = 0; j2 < data.date.getDay(); j2++)
                toAdd.push(null);
            }
            toAdd.push(data);
          }
          state.current = 1;
          state.days.splice(0, 0, toAdd);
        }
        state.transformed = false;
        state.moveLeft = void 0;
      }
      function getFinishRate() {
        var count = 0;
        if (frequency2.value.days != null) {
          for (let i2 = 0; i2 < state.daysFromBeginDateToNow; i2++) {
            const date = new Date(new Date(beginDate.value).setDate(beginDate.value.getDate() + i2));
            for (let pro in frequency2.value.days) {
              if (frequency2.value.days[pro] == date.getDay()) {
                count++;
                break;
              }
            }
          }
        }
        if (frequency2.value.weekPersistDays != null) {
          const beginDateDay = beginDate.value.getDay();
          if (beginDateDay <= frequency2.value.weekPersistDays) {
            count += frequency2.value.weekPersistDays;
          }
          const leftDays = state.daysFromBeginDateToNow - (7 - beginDateDay);
          const mod = leftDays % 7;
          const left = Math.floor(leftDays / 7);
          count += frequency2.value.weekPersistDays * left + mod <= frequency2.value.persistDays ? mode : frequency2.value.weekPersistDays;
        }
        if (frequency2.value.period != null) {
          count = Math.floor(state.daysFromBeginDateToNow / frequency2.value.period);
          if (count == 0)
            return 0;
        }
        return (persistDays2.value / count).toFixed(2) * 100;
      }
      const __returned__ = { pros, emits, today: today2, state, records, beginDate, habitId, current, continuousDays, mostDays, persistDays: persistDays2, frequency: frequency2, loadMonthDays, select, toTransform, backTransform, transformed, selectDate, transformLeft, transformRight, changeMonthDays, getFinishRate, onMounted: vue.onMounted, ref: vue.ref, reactive: vue.reactive, get onlyDate() {
        return onlyDate;
      }, get monthDays() {
        return monthDays;
      }, get getDateStr() {
        return getDateStr;
      }, get copy() {
        return copy;
      }, get ADayMillseconds() {
        return ADayMillseconds;
      }, get DayInFrequency() {
        return DayInFrequency;
      }, get FinishOrNot() {
        return FinishOrNot;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "k-record-month" }, [
      vue.createElementVNode("view", { class: "title" }, [
        vue.createVNode(_component_uni_icons, {
          type: "left",
          onClick: $setup.transformLeft
        }),
        vue.createElementVNode("picker", {
          mode: "date",
          onChange: $setup.selectDate,
          style: { "margin-left": "2%", "margin-right": "2%" },
          value: $setup.getDateStr($setup.current)
        }, vue.toDisplayString($setup.current.getFullYear()) + "年" + vue.toDisplayString($setup.current.getMonth() + 1) + "月 ", 41, ["value"]),
        vue.createVNode(_component_uni_icons, {
          type: "right",
          onClick: $setup.transformRight
        })
      ]),
      vue.createElementVNode("swiper", {
        current: $setup.state.current,
        onTransition: $setup.toTransform,
        onChange: $setup.transformed,
        onAnimationfinish: $setup.backTransform,
        style: { "height": "230px" }
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.state.data, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
              vue.createElementVNode("view", { class: "day-label" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(["日", "一", "二", "三", "四", "五", "六"], (day, index1) => {
                    return vue.createElementVNode(
                      "text",
                      {
                        class: "day-text",
                        key: index1
                      },
                      vue.toDisplayString(day),
                      1
                      /* TEXT */
                    );
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("view", { class: "month" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.state.days[index], (day, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "month-container",
                      key: index2
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(day != null ? day.class : "date"),
                        onClick: ($event) => $setup.select(day),
                        style: vue.normalizeStyle(day != null && $setup.onlyDate(day.date).getTime() <= $setup.today.getTime() && $setup.onlyDate(day.date).getTime() >= $setup.beginDate.getTime() ? "background-color:rgb(5,5,5,.75)" : "")
                      }, vue.toDisplayString(day != null ? day.date.getDate() : ""), 15, ["onClick"])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 40, ["current"]),
      vue.createElementVNode("view", { class: "rercord-card" }, [
        vue.createElementVNode("view", { class: "card-header" }, " 习惯完成数据 "),
        vue.createElementVNode("view", { class: "card-content" }, [
          vue.createElementVNode("view", { class: "card" }, [
            vue.createElementVNode("view", { class: "head" }, [
              vue.createElementVNode("image", {
                src: _imports_0,
                class: "head-image"
              }),
              vue.createElementVNode("text", null, "完成率")
            ]),
            vue.createElementVNode("view", { class: "card-option" }, [
              vue.createTextVNode(
                vue.toDisplayString($setup.getFinishRate()) + " ",
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "card-option-text" }, "%")
            ])
          ]),
          vue.createElementVNode("view", { class: "card" }, [
            vue.createElementVNode("view", { class: "head" }, [
              vue.createElementVNode("image", {
                src: _imports_1,
                class: "head-image"
              }),
              vue.createElementVNode("text", null, "总完成")
            ]),
            vue.createElementVNode("view", { class: "card-option" }, [
              vue.createTextVNode(
                vue.toDisplayString($setup.persistDays) + " ",
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "card-option-text" }, "天")
            ])
          ]),
          vue.createElementVNode("view", { class: "card" }, [
            vue.createElementVNode("view", { class: "head" }, [
              vue.createElementVNode("image", {
                src: _imports_2,
                class: "head-image"
              }),
              vue.createElementVNode("text", null, "连续")
            ]),
            vue.createElementVNode("view", { class: "card-option" }, [
              vue.createTextVNode(
                vue.toDisplayString($setup.continuousDays) + " ",
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "card-option-text" }, "天")
            ])
          ]),
          vue.createElementVNode("view", { class: "card" }, [
            vue.createElementVNode("view", { class: "head" }, [
              vue.createElementVNode("image", {
                src: _imports_3,
                class: "head-image"
              }),
              vue.createElementVNode("text", null, "最多连续")
            ]),
            vue.createElementVNode("view", { class: "card-option" }, [
              vue.createTextVNode(
                vue.toDisplayString($setup.mostDays) + " ",
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", { class: "card-option-text" }, "天")
            ])
          ])
        ])
      ])
    ]);
  }
  const KRecordMonth = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e78b580a"], ["__file", "D:/repos/html+css+js/SelfSchedule/components/KRecordMonth.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.component("k-calendar", KCalendar);
    app.component("k-time-counter", KTimeCounter);
    app.component("k-split", KSplit);
    app.component("k-radio-group", KRdaioGroup);
    app.component("k-habit-group", KHabitGroup);
    app.component("k-swiper", KSwiper);
    app.component("k-record-month", KRecordMonth);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
