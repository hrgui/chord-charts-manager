# @hrgui/chord-charts-manager

- A chord chart is a composition with chord symbols (A B C D E F G ...) with lyrics. They are meant to signal the musician what chords to play.
- Manages chord charts as songs (CRUD).
- Setlists are composed of 1 or more chord charts
- Groups can see a list of songs and setlists.
- Users belong to groups.

# How to run this for development (WIP)

1. yarn link `@hrgui/chord-charts`
2. Place a `app-config.json` file that just consists of `{}`.
3. Run the `chord-charts-manager-api` in port 4000.

# How to run cypress tests

```
yarn cypress open
```
