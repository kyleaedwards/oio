# Transient (`oio`)

Command line utility for project-based time tracking

### Installation

```
yarn global add oio
```

### Commands

#### `oio start {project} {discipline}`
Starts tracking a new event for a given project slug and discipline. Stops last event if still tracking.

#### `oio stop`
Stops last event if still tracking.

#### `oio upgrade`
Pulls down the latest changes from the set remote Github repo.

### To-do
- Remote storage
- Decoupling CRUD operations into a separate library