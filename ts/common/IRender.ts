module DbDashboards.Dials {
    export interface IRender {

        render();
        canvas(): HTMLCanvasElement;
        destroy();

    }
}