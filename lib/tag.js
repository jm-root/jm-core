'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tag';

    $.TagObject = $.EventEmitter.extend({
        _className: 'tagObject',

        ctor: function ctor() {
            this._super();
            this._tags = [];
            Object.defineProperty(this, 'tags', {
                value: this._tags,
                writable: false
            });
        },

        destroy: function destroy() {
            this.emit('destroy', this);
            this.removeAllTags();
        },

        hasTag: function hasTag(tag) {
            var tags = this._tags;
            return tags.indexOf(tag) != -1;
        },

        hasTagAny: function hasTagAny(tags) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var t = _step.value;

                    if (this.hasTag(t)) return true;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return false;
        },

        hasTagAll: function hasTagAll(tags) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var t = _step2.value;

                    if (!this.hasTag(t)) return false;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return true;
        },

        addTag: function addTag(tag) {
            var tags = this._tags;
            if (this.hasTag(tag)) return this;
            tags.push(tag);
            this.emit('addTag', tag);
            return this;
        },

        addTags: function addTags(tags) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var t = _step3.value;

                    this.addTag(t);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return this;
        },

        removeTag: function removeTag(tag) {
            var tags = this._tags;
            var idx = tags.indexOf(tag);
            if (idx >= 0) {
                tags.splice(idx, 1);
            }
            this.emit('removeTag', tag);
            return this;
        },

        removeTags: function removeTags(tags) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = tags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var t = _step4.value;

                    this.removeTag(t);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return this;
        },

        removeAllTags: function removeAllTags() {
            var v = this._tags;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = v[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var t = _step5.value;

                    this.emit('removeTag', t);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            this._tags = [];
            this.emit('removeAllTags');
            return this;
        }

    });

    $.tagObject = function () {
        return new $.TagObject();
    };

    var prototype = $.TagObject.prototype;
    var Tag = {
        _tags: [],

        hasTag: prototype.hasTag,
        hasTagAny: prototype.hasTagAny,
        hasTagAll: prototype.hasTagAll,
        addTag: prototype.addTag,
        addTags: prototype.addTags,
        removeTag: prototype.removeTag,
        removeTags: prototype.removeTags,
        removeAllTags: prototype.removeAllTags
    };

    $.enableTag = function (obj) {
        if (obj._tags != undefined) return;
        for (var key in Tag) {
            obj[key] = Tag[key];
        }
        obj._tags = [];
        Object.defineProperty(obj, 'tags', {
            value: obj._tags,
            writable: false
        });
        $.enableEvent(obj);
    };

    $.disableTag = function (obj) {
        for (var key in Tag) {
            delete obj[key];
        }
        $.disableEvent(obj);
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.TagObject;
            delete $.tagObject;
            delete $.enableTag;
            delete $.disableTag;
        }
    };
};

module.exports = exports['default'];