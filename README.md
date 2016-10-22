# Preact Redux Autocomplete

Fancy autocomplete using Preact, Redux and Animate.css


##Demo - [fancy.surge.sh](https://fancy.surge.sh)


---


# Quick-Start Guide

- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Structure](#structure)


## Installation

**1. Clone this repo:**

```sh
git clone https://github.com/ganapativs/preact-redux-autocompete.git autocomplete
cd autocomplete
```


**2. Make it your own:**

```sh
rm -rf .git && git init && yarn init && yarn
```

> :information_source: This re-initializes the repo and sets up your NPM project.


**3. Install the dependencies:**

```sh
yarn
```

> You're done installing! Now let's get started developing.



## Development Workflow


**4. Start a live-reload development server:**

```sh
PORT=8080 yarn run dev
```

> This is a full web server nicely suited to your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**5. Generate a production build in `./build`:**

```sh
yarn run build
```

You can now deploy the contents of the `build` directory to production!

> **Example:** deploy to [surge.sh](https://surge.sh):
>
> `yarn run surge`

---


## License

MIT


[Preact]: https://github.com/developit/preact
[webpack]: https://webpack.github.io
