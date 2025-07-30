class Task {
    constructor(title, obs, priority) {
        this.title = title;
        this.obs = obs;
        this.priority = priority;
    }

    //title
    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }

    //obs
    getObs() {
        return this.obs;
    }
    setObs(newObs) {
        this.obs = newObs;
    }

    //priority
    getPriority() {
        return this.priority;
    }
    setPriority(newPriority) {
        this.priority = newPriority;
    }
}
