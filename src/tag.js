export default (jm) => {
    jm.TagObject = jm.EventEmitter.extend({
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

    jm.tagObject = function () {
        return new jm.TagObject();
    };

    let prototype = jm.TagObject.prototype;
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

    jm.enableTag = function (obj) {
        if (obj._tags != undefined) return;
        for (let key in Tag) {
            obj[key] = Tag[key];
        }
        obj._tags = [];
        Object.defineProperty(obj, 'tags', {
            value: obj._tags,
            writable: false,
        });
        jm.enableEvent(obj);
    };

    jm.disableTag = function (obj) {
        for (let key in Tag) {
            delete obj[key];
        }
        jm.disableEvent(obj);
    };
};
