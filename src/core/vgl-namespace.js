export default {
  inject: {
    vglNamespace: {
      default() {
        const renderers = [];
        const beforeRender = [];
        let updated;
        return {
          renderers,
          cameras: Object.create(null),
          scenes: Object.create(null),
          update: () => {
            if (!updated) {
              this.$nextTick(() => {
                beforeRender.forEach((hook) => { hook(); });
                renderers.forEach((vm) => { vm.render(); });
                updated = false;
              });
              updated = true;
            }
          },
          beforeRender,
          curves: Object.create(null),
          geometries: Object.create(null),
          materials: Object.create(null),
          textures: Object.create(null),
          object3ds: Object.create(null),
        };
      },
    },
  },
  provide() {
    return {
      vglNamespace: Object.create(this.vglNamespace, {
        curves: { value: Object.create(this.vglNamespace.curves) },
        geometries: { value: Object.create(this.vglNamespace.geometries) },
        materials: { value: Object.create(this.vglNamespace.materials) },
        textures: { value: Object.create(this.vglNamespace.textures) },
        object3ds: { value: Object.create(this.vglNamespace.object3ds) },
      }),
    };
  },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
