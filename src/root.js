import err from 'jm-err';
import mdl from 'jm-module';

/**
 * Class representing a root.
 */
class Root {

    /**
     * create a root
     */
    constructor () {
        err.enableErr(this);
        mdl.enableModule(this);
        this.enableModule = mdl.enableModule;
        this.disableModule = mdl.disableModule;
    }
}

export default Root;
