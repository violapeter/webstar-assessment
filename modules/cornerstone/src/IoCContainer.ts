export class IoCContainer<
  DependencyId extends string,
  DependencyMap extends Record<DependencyId, unknown>,
> {
  private entities = new Map<DependencyId, DependencyMap[DependencyId]>()

  register<K extends DependencyId>(
    name: K,
    implementation: DependencyMap[K],
  ): void {
    this.entities.set(name, implementation as DependencyMap[DependencyId])
  }

  get<K extends DependencyId>(name: K): DependencyMap[K] {
    const entity = this.entities.get(name)
    if (!entity) {
      throw new Error(`Entity not found: ${name}`)
    }
    return entity as DependencyMap[K]
  }
}
