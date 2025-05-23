# Using Tailwind CSS with Bootstrap in jansevak-ai-new

This project uses both Bootstrap and Tailwind CSS, configured to work together without conflicts.

## How It Works

1. Tailwind CSS is installed with a special configuration that prevents conflicts:
   - All Tailwind classes use the `tw-` prefix
   - Tailwind's base styles (preflight) are disabled to prevent overriding Bootstrap styles
   - The `important` flag is set to true to allow overriding Bootstrap when needed

2. Load order in `App.jsx`:
   ```jsx
   import 'bootstrap/dist/css/bootstrap.min.css'
   import './tailwind.output.css'
   import './index.css'
   ```

## Usage Guidelines

### Using Bootstrap (Existing)

Continue using Bootstrap classes as before:

```jsx
<div className="container">
  <div className="row">
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some text</p>
          <button className="btn btn-primary">Click me</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Using Tailwind CSS (New)

Use Tailwind CSS classes with the `tw-` prefix:

```jsx
<div className="tw-bg-blue-100 tw-p-4 tw-rounded-lg tw-shadow-md">
  <h2 className="tw-text-xl tw-font-bold tw-text-blue-800">Tailwind Heading</h2>
  <p className="tw-text-blue-600">This text uses Tailwind styles</p>
  <button className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded">
    Tailwind Button
  </button>
</div>
```

### Mixing Both (Advanced)

You can mix Bootstrap and Tailwind classes in the same element:

```jsx
<div className="card tw-shadow-lg">
  <div className="card-body tw-border-t-4 tw-border-green-500">
    <h5 className="card-title tw-text-green-700">Mixed Styling</h5>
    <p className="card-text">Bootstrap card with Tailwind accents</p>
  </div>
</div>
```

## Example Component

See `src/components/TailwindExample.jsx` for a complete example of using both styling systems together.

## Important Notes

1. Always use the `tw-` prefix for Tailwind classes to avoid conflicts
2. Bootstrap styles take precedence by default, unless overridden by Tailwind with `!important`
3. For components that need to be styled primarily with Tailwind, consider using all Tailwind classes instead of mixing
4. The jansevak-ai-new functionality is not affected by this integration 