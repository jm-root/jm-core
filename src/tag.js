export default ($, name = 'tag') => {
    $.TagObject = $.EventEmitter.extend({
        _className: 'tagObject',

        ctor: function () {
            this._super();
            this._tags = [];
            Object.defineProperty(this, 'tags', {
                value: this._tags,
                writable: false,
            });
        },

        destroy: function () {
            this.emit('destroy', this);
            this.removeAllTags();
        },

        hasTag: function (tag) {
            let tags = this._tags;
            return tags.indexOf(tag) != -1;
        },

        hasTagAny: function (tags) {
            for (let t of tags) {
                if (this.hasTag(t)) return true;
            }
            return false;
        },

        hasTagAll: function (tags) {
            for (let t of tags) {
                if (!this.hasTag(t)) return false;
            }
            return true;
        },

        addTag: function (tag) {
            let tags = this._tags;
            if (this.hasTag(tag)) return this;
            tags.push(tag);
            this.emit('addTag', tag);
            return this;
        },

        addTags: function (tags) {
            for (let t of tags) {
                this.addTag(t);
            }
            return this;
        },

        removeTag: function (tag) {
            let tags = this._tags;
            let idx = tags.indexOf(tag);
            if (idx >= 0) {
                tags.splice(idx, 1);
            }
            this.emit('removeTag', tag);
            return this;
        },

        removeTags: function (tags) {
            for (let t of tags) {
                this.removeTag(t);
            }
            return this;
        },

        removeAllTags: function () {
            let v = this._tags;
            for (let t of v) {
                this.emit('removeTag', t);
            }
            this._tags = [];
            this.emit('removeAllTags');
            return this;
        },

    });

    $.tagObject = function () {
        return new $.TagObject();
    };

    let prototype = $.TagObject.prototype;
    let Tag = {
        _tags: [],
        hasTag: prototype.hasTag,
        hasTagAny: prototype.hasTagAny,
        hasTagAll: prototype.hasTagAll,
        addTag: prototype.addTag,
        addTags: prototype.addTags,
        removeTag: prototype.removeTag,
        removeTags: prototype.removeTags,
        removeAllTags: prototype.removeAllTags,
    };

    $.enableTag = function (obj) {
        if (obj._tags != undefined) return;
        for (let key of Object.keys(Tag)) {
            obj[key] = Tag[key];
        }
        obj._tags = [];
        Object.defineProperty(obj, 'tags', {
            value: obj._tags,
            writable: false,
        });
        $.enableEvent(obj);
    };

    $.disableTag = function (obj) {
        for (let key of Object.keys(Tag)) {
            delete obj[key];
        }
        $.disableEvent(obj);
    };

    return {
        name: name,
        unuse: function ($) {
            delete $.TagObject;
            delete $.tagObject;
            delete $.enableTag;
            delete $.disableTag;
        },
    };
};
