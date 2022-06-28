```
 _____  ______ _   _  ____    _    _ _______ _______ _____  
|  __ \|  ____| \ | |/ __ \  | |  | |__   __|__   __|  __ \ 
| |  | | |__  |  \| | |  | | | |__| |  | |     | |  | |__) |
| |  | |  __| | . ` | |  | | |  __  |  | |     | |  |  ___/ 
| |__| | |____| |\  | |__| | | |  | |  | |     | |  | |     
|_____/|______|_| \_|\____/  |_|  |_|  |_|     |_|  |_|
```

# Deno Http

[![language:language](https://img.shields.io/badge/language-deno-black)]()

A wrapper around the standard request library.

## Objectives

- [ ] Dockerise
- [ ] Refactor tests
- [ ] ReadMe updates
- [ ] Add JsDoc
- [ ] Fix lint issues
- [ x ] Error handling
- [ x ] Result Type

## Basic Usage

```
import { httpGet } from 'https://raw.githubusercontent.com/ethandunford/deno-http/main/http.ts';

const resp = await httpGet({ url: "https://example.com"})
console.log(resp.status);
console.log(resp.headers.get("Content-Type"));
console.log(await resp.text());
```

## Testing

```
deno test --allow-read --allow-net --allow-env ./tests/*.ts
```

## License

Apache License

# Version

0.0.1

## Contributing

1. Fork it (<https://github.com/ethandunford/deno-http/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

- [ethandunford](https://github.com/ethandunford) Ethan Dunford - Creator
