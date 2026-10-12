import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

type Stage = 'idle' | 'busy' | 'done';

const LABELS: Record<Stage, string> = {
  idle: 'Download',
  busy: 'Downloading…',
  done: 'Downloaded',
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** A process: the button carries its stage as `data-state`, and the icon follows it. */
@Component({
  selector: 'app-download-button',
  template: `
    <button
      type="button"
      class="button"
      [attr.data-state]="stage()"
      [disabled]="stage() !== 'idle'"
      (click)="download()"
    >
      <lord-icon
        src="/icons/download.json"
        trigger="follow(data-state, busy=loop-cycle, done=morph-check)"
        target="button"
        current-color
      />
      {{ labels[stage()] }}
    </button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DownloadButton {
  protected readonly labels = LABELS;
  protected readonly stage = signal<Stage>('idle');

  // Pretend work: busy for two seconds, done for two more, then ready again.
  protected async download() {
    this.stage.set('busy');
    await wait(2000);
    this.stage.set('done');
    await wait(2000);
    this.stage.set('idle');
  }
}
