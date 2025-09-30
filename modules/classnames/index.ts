type CSSModule = { [key: string]: string }

type Condition = boolean | (() => boolean)
type ConditionalClassName<T extends string | number> = {
  [Property in T]: Condition
}

function processCondition(condition: Condition): boolean {
  return typeof condition === 'function' ? condition() : condition
}

export default function classNames(cssModule: CSSModule) {
  type ClassName = keyof typeof cssModule
  type Args = Array<ClassName | ConditionalClassName<ClassName>>

  return function (...args: Args) {
    return args.reduce<string>((finalClassNames, className) => {
      if (!className) return finalClassNames

      if (typeof className === 'string') {
        return finalClassNames.concat(' ', cssModule[className])
      } else {
        for (const [key, condition] of Object.entries(className)) {
          if (processCondition(condition)) {
            return finalClassNames.concat(' ', cssModule[key])
          }
        }

        return finalClassNames
      }
    }, '')
  }
}
