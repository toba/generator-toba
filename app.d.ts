import * as Generator from 'yeoman-generator';
export declare class TobaGenerator extends Generator {
    /**
     * Template properties to be injected with EJS.
     * @see http://ejs.co/
     */
    props: {
        name: string;
        scope: string;
    };
    constructor(args: string | string[], options: any);
    prompting(): Promise<void>;
    writing(): void;
    install(): void;
    private defaultName;
    /**
     * Copy template files with optional file rename.
     *
     * @see http://yeoman.io/authoring/file-system.html
     */
    private copy;
}
