(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jszip"], factory);
    } else if (typeof exports === "object") {
        // Node. Does not work with strict CommonJS
        module.exports = factory(require("jszip"));
    } else {
        // Browser globals with support for web workers (root is window)
        root.SecureDfuPackage = factory(root.JSZip);
    }
}(this, function(JSZip) {
    "use strict";

    function Package(buffer) {
        this.buffer = buffer;
        this.zipFile = null;
        this.manifest = null;
    };

    Package.prototype.load = function() {
        return JSZip.loadAsync(this.buffer)
        .then(zipFile => {
            this.zipFile = zipFile;
            try {
                return this.zipFile.file("manifest.json").async("string");
            } catch(e) {
                throw new Error("Unable to find manifest, is this a proper DFU package?");
            }
        })
        .then(content => {
            this.manifest = JSON.parse(content).manifest;
            return this;
        });
    };

    Package.prototype.getImage = function(types) {
        for (var type of types) {
            if (this.manifest[type]) {
                var entry = this.manifest[type];
                var result = {
                    type: type,
                    initFile: entry.dat_file,
                    imageFile: entry.bin_file
                };
    
                return this.zipFile.file(result.initFile).async("arraybuffer")
                .then(data => {
                    result.initData = data;
                    return this.zipFile.file(result.imageFile).async("arraybuffer")
                })
                .then(data => {
                    result.imageData = data;
                    return result;
                });
            }
        }
    };

    Package.prototype.getBaseImage = function() {
        return this.getImage(["softdevice", "bootloader", "softdevice_bootloader"]);
    };

    Package.prototype.getAppImage = function() {
        return this.getImage(["application"]);
    };

    return Package;
}));
