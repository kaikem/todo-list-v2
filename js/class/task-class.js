class Task {
    constructor(title, obs, priority, status) {
        this.title = title;
        this.obs = obs;
        this.priority = priority;
        this.status = status;
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

    //status
    getStatus() {
        return this.status;
    }
    setStatus(newStatus) {
        this.status = newStatus;
    }
}

export { Task };
