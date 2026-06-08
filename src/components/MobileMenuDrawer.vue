<template>
  <Teleport to="body">
    <Transition name="mm-fade">
      <div
        v-if="open"
        class="mobile-menu-backdrop"
        aria-hidden="true"
        @click="$emit('close')"
      ></div>
    </Transition>

    <Transition name="mm-slide">
      <aside
        v-if="open"
        id="mobile-menu"
        class="mobile-menu-drawer"
        :aria-label="$t('accessibility.mobileNavigation')"
      >
        <div class="mm-header">
          <span class="mm-title">Wilberto Pacheco</span>
          <button
            type="button"
            class="mm-close"
            :aria-label="$t('accessibility.closeMenu')"
            @click="$emit('close')"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        <nav class="mm-nav">
          <a
            v-for="item in items"
            :key="item.id"
            :href="'#' + item.id"
            class="mm-link"
            :class="{ active: activeSection === item.id }"
            @click.prevent="$emit('navigate', item.id)"
          >
            <span class="mm-icon" aria-hidden="true">
              <app-icon :icon="item.icon" />
            </span>
            <span class="mm-label">{{ labelFor(item.id) }}</span>
            <span class="mm-chevron" aria-hidden="true">›</span>
          </a>
        </nav>

        <div class="mm-footer">
          <a
            :href="resumeUrl"
            class="mm-resume-btn"
            :download="resumeFilename"
            @click="$emit('close')"
          >
            <app-icon :icon="['fas', 'download']" aria-hidden="true" />
            {{ $t('hero.downloadResume') }}
          </a>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'MobileMenuDrawer',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    activeSection: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    resumeFilename: {
      type: String,
      required: true,
    },
    labelFor: {
      type: Function,
      required: true,
    },
  },
  emits: ['close', 'navigate'],
}
</script>

<style scoped>
.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 1100;
}

.mobile-menu-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(80vw, 320px);
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  box-shadow: 8px 0 40px rgba(0, 0, 0, 0.28);
  z-index: 1101;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

[data-theme="dark"] .mobile-menu-drawer {
  box-shadow: 8px 0 48px rgba(0, 0, 0, 0.55);
}

.mm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.mm-title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.mm-close {
  position: relative;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.mm-close:hover {
  border-color: var(--primary-color);
  background: var(--bg-tertiary);
}

.mm-close span {
  position: absolute;
  width: 16px;
  height: 2px;
  border-radius: 1px;
  background: var(--text-primary);
}

.mm-close span:first-child { transform: rotate(45deg); }
.mm-close span:last-child  { transform: rotate(-45deg); }

.mm-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--space-md);
}

.mm-link {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 0.85rem var(--space-md);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.mm-link:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.mm-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--primary-color);
  font-size: 0.95rem;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.mm-label {
  flex: 1;
}

.mm-chevron {
  font-size: 1.35rem;
  line-height: 1;
  color: var(--text-secondary);
  opacity: 0.45;
}

.mm-link.active {
  background: var(--primary-color);
  color: #fff;
}

.mm-link.active .mm-icon {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.mm-link.active .mm-chevron {
  color: #fff;
  opacity: 0.85;
}

.mm-footer {
  margin-top: auto;
  padding: var(--space-md) var(--space-md) var(--space-lg);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.mm-resume-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  padding: 0.75rem var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.mm-resume-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.mm-fade-enter-active,
.mm-fade-leave-active {
  transition: opacity 0.25s ease;
}
.mm-fade-enter-from,
.mm-fade-leave-to {
  opacity: 0;
}

.mm-slide-enter-active,
.mm-slide-leave-active {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.mm-slide-enter-from,
.mm-slide-leave-to {
  transform: translateX(-100%);
}

@media (prefers-reduced-motion: reduce) {
  .mm-fade-enter-active,
  .mm-fade-leave-active,
  .mm-slide-enter-active,
  .mm-slide-leave-active {
    transition: none;
  }
}
</style>
