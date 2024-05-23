import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../../../../../src/app/services/db.service';
import { RepoService } from '../../../../../../src/app/services/repo.service';
// import { CampaignChartElement } from 'src/app/_models/CampaignChartElement';
import { ChartElement } from '../../../../../../src/app/Models/_models/ChartElement';
import { FlowItem } from '../../../../../../src/app/Models/_models/FlowItem';
declare var $: any;

@Component({
  selector: 'app-createflow',
  templateUrl: './createflow.component.html',
  styleUrls: ['./createflow.component.scss']
})

export class CreateflowComponent implements OnInit {
  form: UntypedFormGroup;
  colors = ['#9E9E9E', '#388E3C', '#4527A0', '#EF6C00'];
  @ViewChild('chart')
  chart?: ElementRef<SVGElement>;
  id?: number;
  hideedit = false;
  hidedelete = false;
  hideadd = false;

  newItem: FlowItem = { display_name: 'Send Call', level: 1, event_type: '', flow: 1, type_id: 1, color: '#9E9E9E' };
  selected = this.newItem;
  root = this.newItem;
  list: FlowItem[] = [];
  chartElementList: ChartElement[] = [];
  WIDTH = 300;
  HEIGHT = 300;
  ELEMENT_WIDTH = 150;
  ELEMENT_HEIGHT = 40;
  PADDING = 10;
  zoom = 1;
  ZOOM_FACTOR = 1.2;
  dragMode = false;
  moveMode = false;
  startX = 0;
  startY = 0;
  x0 = 0;
  y0 = 0;
  x = 0;
  y = 0;
  viewBox = `${this.x} ${this.y} ${this.WIDTH} ${this.HEIGHT}`;
  intent: any;
  slot: any;
  actions: any;
  flowlist: any = [];
  allactions: any;
  allintent: any;
  allslot: any;
  displayname: any;
  grid = true;


  public dragging: boolean;

  isDraggingGrid = false;
  gridDownClientX: number;
  gridDownClientY: number;
  scaleFactor = 1.02;
  disabled = true;
  // Node
  isDraggingNodeLayer = false;
  draggingNodeLayer: ChartElement;
  nodeLayers: ChartElement[] = [];
  selectedNodeLayers: ChartElement[] = [];


  constructor(private route: ActivatedRoute, private repo: RepoService, public db: DbService, public router: Router, private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef) { }
  setChartSize() {
    if (this.chart) {
      this.WIDTH = this.chart.nativeElement.clientWidth;
      this.HEIGHT = this.chart.nativeElement.clientHeight;
      this.setViewBox();
      this.chartElementList = this.setChartElementList(this.list);
    }
  }


  saveflow() {
    this.router.navigate(['botflow/customdata/' + this.id, {}]);


  }

  // initForm() {
  //   // this.form.disable();
  //
  //   this.form = this.fb.group({
  //     // name: new FormControl({ value: '', disabled: this.disabled }),

  //     'fieldA' : ({ value: '', disabled: this.disabled }),
  //     'fieldB' : 'this.allactions.fallback_response',
  //     'fieldC' : 'this.allactions.validation_response',
  //     'fieldD':  'this.allactions.chat_reponse',
  //   });
  //
  //   this.cdr.detectChanges();
  //
  //   this.form.disable();
  // }

  // reInit2() {
  //   this.initForm();

  //   this.cdr.detectChanges();

  //   this.form.enable();
  // }
  // reInit() {
  //   this.initForm();


  // }

  ngAfterViewInit() {
    window.setTimeout(() => this.setChartSize());
  }

  @HostListener('window:resize')
  onResize() {
    this.setChartSize();
  }

  setViewBox() {

    this.viewBox = `${this.x * this.zoom} ` +
      `${this.y * this.zoom} ` +
      `${this.WIDTH * this.zoom} ` +
      `${this.HEIGHT * this.zoom}`;
  }

  onPan() {
    this.dragMode = !this.dragMode;
  }

  onZoomIn() {
    this.zoom /= this.ZOOM_FACTOR;
    this.setViewBox();
  }

  onZoomOut() {
    this.zoom *= this.ZOOM_FACTOR;
    this.setViewBox();
  }
  public handleClick(event: MouseEvent, data): void {
    if (this.dragging) {

      this.setConnection(data);
      this.dragging = false;
      return;
    }
  }
  @HostListener('document:pointerup', ['$event'])
  public upHandle(event: PointerEvent) {

    this.isDraggingGrid = false;
    this.isDraggingNodeLayer = false;
    this.draggingNodeLayer = null;
  }

  @HostListener('document:pointermove', ['$event'])
  public moveHandle(pointerEvent: PointerEvent) {

    pointerEvent.preventDefault();
    pointerEvent.stopPropagation();

    if (!this.isDraggingGrid && this.isDraggingNodeLayer) {

      const viewBoxList = this.viewBox =
        `${this.x * this.zoom} ` +
        `${this.y * this.zoom} ` +
        `${this.WIDTH * this.zoom} ` +
        `${this.HEIGHT * this.zoom}`;


      const aspX = parseInt(viewBoxList[4], 10) / 500;
      const aspY = parseInt(viewBoxList[3], 10) / 500;

      // move NodeLayer
      if (pointerEvent.offsetX) {

        // Math.floor((Math.random()*500)+1);
        this.draggingNodeLayer.x = this.round(pointerEvent.offsetX);

        this.draggingNodeLayer.y = this.round(pointerEvent.offsetY);

      }
      else {

        const { left, top } = (pointerEvent.srcElement as Element).getBoundingClientRect();
        this.draggingNodeLayer.x = pointerEvent.clientX - left + parseInt(viewBoxList[0], 10);
        this.draggingNodeLayer.y = pointerEvent.clientY - top + parseInt(viewBoxList[1], 10);

      }

    }
  }
  round(v) {
    return Math.round(v / 10) * 10;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    if (this.dragMode) {
      this.moveMode = true;
      this.x0 = this.x;
      this.y0 = this.y;
      this.startX = e.clientX;
      this.startY = e.clientY;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    if (this.dragMode) {
      this.moveMode = false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.moveMode) {
      let dx, dy;
      dx = e.clientX - this.startX;
      dy = e.clientY - this.startY;
      this.x = this.x0 - dx * this.zoom;
      this.y = this.y0 - dy * this.zoom;
      this.setViewBox();
    }
  }




  getRoot() {
    if (this.id) {
      this.repo.getItem(this.id).then(item => {

        this.root = item;
        this.selected = this.root;
      });


    }
  }






  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {


      // this.initForm();
      const id = paramMap.get('id');
      if (id) {

        this.id = Number(id);
      }
      this.getList();
      this.getAction();
      this.getSlot();
      this.getIntentFlow();
    });
  }


  getIntentFlow(): void {
    this.db.list('intentflow/', { bot_id: this.id }, ((response): void => {

      this.allintent = response;
    }));
  }

  getSlot(): void {


    this.db.list('slotflow/', { bot_id: this.id }, ((response): void => {
      this.allslot = response;
    }));
  }

  getAction(): void {
    this.db.list('actionflow/', { bot_id: this.id }, ((response): void => {

      this.allactions = response;
    }));
  }




  AddEvent(item: FlowItem) {
    this.selected = item;
    $('.hide').show();

    $('#AddEventRounds').appendTo('body').modal('show');

    //   this.repo.add({
    //   display_name: 'New ',
    //   event_type:'',
    //   parent: this.selected.id,
    //   root: this.id,
    //   level: this.selected.level + 1,
    //   flow:1,
    // }).then(id => this.getList());
  }



  AddnewEvent(eventtype, color): void {
    eventtype;
    this.selected;
    const event = {
      display_name: 'New ',
      event_type: eventtype,
      parent: this.selected.id,
      root: this.id,
      level: this.selected.level + 1,
      flow: 1,
      color,
      isSelected: false,
      shadowFilter: 'url(#shadow)',
    };

    this.db.store('botflow/', event, (response): void => {

      this.selected = response;
      this.getList();
      this.getAction();
      this.getSlot();
      this.getIntentFlow();
      $('#AddEventRounds').appendTo('body').modal('hide');
      $('.modalopen').appendTo('body').modal('show');
    });



  }


  clickHandleNodeLayer(nodeLayer: ChartElement) {


    nodeLayer.isSelected = true;

    this.selectedNodeLayers.push(nodeLayer);
    // this.selectedNodeLayers.push(nodeLayer);
    this.setConnection(this.selectedNodeLayers);


  }

  downHandleNodeLayer(pointerEvent: PointerEvent, nodeLayer: ChartElement) {

    this.isDraggingGrid = false;
    this.isDraggingNodeLayer = true;
    this.draggingNodeLayer = nodeLayer;
    pointerEvent.preventDefault();

  }
  mouseover(nodeLayer: ChartElement) {

    nodeLayer.isSelected = true;
    // this.selectedNodeLayers.push(nodeLayer);
    this.hideedit = !this.hideedit;
    this.hidedelete = !this.hidedelete;
    this.hideadd = !this.hideadd;
  }


  gettypeID(item, type_id): void {
    this.selected = item;
    this.selected.type_id = type_id;
    this.onClick(this.selected);
  }
  onClick(item): void {
    this.selected = item;
    if (this.selected.event_type == 'intent') {
      this.db.list('intents/', { id: this.selected.type_id }, ((response): void => {
        this.intent = response;
        $('.modalopen').appendTo('body').modal('show');
      }));

    } else if (this.selected.event_type == 'action') {

      this.db.list('actions/', { id: this.selected.type_id }, ((response): void => {

        this.actions = response;
        $('.modalopen').appendTo('body').modal('show');
      }));

    } else if (this.selected.event_type == 'slot') {
      this.db.list('slot/', { id: this.selected.type_id }, ((response): void => {
        this.slot = response;
        $('.modalopen').appendTo('body').modal('show');
      }));
    }




  }

  //
  getList(): void {
    if (this.id) {
      this.db.list('callflow/', { id: this.id }, ((response): void => {
        response.forEach(element => {
          if (element.parent == 0) {
            element.parent = undefined;
          }
        });
        this.flowlist = response;
        this.list = this.flowlist;
        this.chartElementList = this.setChartElementList(this.list);

      }));
    }
  }

  formclickable() {

  }

  Save(): void {

    if (this.selected.id) {
      this.selected;

      if (this.selected.event_type == 'action') {
        const childrendata = this.allactions.filter(item => item.id === this.selected.type_id)[0];
        this.displayname = childrendata.action;

      } else if (this.selected.event_type == 'intent') {
        const childrendata = this.allintent.filter(item => item.id === this.selected.type_id)[0];
        this.displayname = childrendata.intent;

      } else if (this.selected.event_type == 'slot') {
        const childrendata = this.allslot.filter(item => item.id === this.selected.type_id)[0];
        this.displayname = childrendata.slot_name;
      }

      const event = {
        display_name: this.displayname,
        id: this.selected.id,
        root: this.id,
        level: this.selected.level + 1,
        flow: 1,
        type_id: this.selected.type_id,
        event_type: this.selected.event_type
      };
      this.db.store('updatebotflow/', event, (response): void => {

        this.getList();
        $('.modalopen').appendTo('body').modal('hide');

      });


    }

  }

  onDelete(item) {
    if (this.selected.id) {

      this.db.destroy('Botflowdelete/', this.selected.id, (response): void => {

        this.getList();
        $('.modalopen').appendTo('body').modal('hide');

      });
    }
  }

  setChartElementList(list: FlowItem[]): ChartElement[] {

    const result: ChartElement[] = [];
    const x = this.WIDTH / 2;
    const y = this.ELEMENT_HEIGHT;
    const root: ChartElement = {
      item: this.root,
      x,
      y,
      childrenCount: 0,
      category: 0,
      isSelected: false,
      shadowFilter: 'url(#shadow)',
    };
    result.push(root);

    this.setChildren(result, root, list);

    this.shiftChartElemens(result);
    this.setConnection(result);
    return result;
  }


  setChildren(result: ChartElement[], parent: ChartElement, list: FlowItem[]) {
    const children = list.filter(item => item.parent === parent.item.id);

    parent.childrenCount = children.length;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const offset = parent.x - (children.length - 1) / 2 * (this.ELEMENT_WIDTH + this.PADDING * 2);


      const element = {
        x: offset + (this.ELEMENT_WIDTH + this.PADDING * 2) * i,
        y: parent.y + this.ELEMENT_HEIGHT * 2,
        item: child,
        parent,
        category: parent.category || i + 1,
        childrenCount: 0,
        isSelected: false,
        shadowFilter: 'url(#shadow)',
      };

      result.push(element);

      this.setChildren(result, element, list);
    }
  }


  shiftChartElemens(list: ChartElement[]) {

    let level = 1;
    while (true) {
      let offset = 0;
      const elementList = list.filter(e => e.item.level === level);
      if (!elementList.length) {
        break;
      }
      elementList.sort(this.compareElements);
      for (let i = 0; i < elementList.length - 1; i++) {
        const element = elementList[i];
        const sibling = elementList[i + 1];
        const space = sibling.x - this.ELEMENT_WIDTH - 2 * this.PADDING - element.x;
        if (space < 0) {
          sibling.x -= space;
          list.filter(e => e.parent === element).forEach(e => e.x -= space);
          offset = Math.max(-space, offset);
        }
      }
      list.filter(e => e.item.level >= level).forEach(e => e.x -= offset / 2);
      level++;
    }
  }


  setConnection(list: ChartElement[]) {

    for (const e of list) {
      if (e.parent && e.item.level) {
        e.connection = `M ${e.x} ${e.y - this.ELEMENT_HEIGHT / 2} ` +
          `C ${e.x} ${e.y - this.ELEMENT_HEIGHT}, ` +
          `${e.parent.x} ${e.parent.y + this.ELEMENT_HEIGHT}, ` +
          `${e.parent.x} ${e.parent.y + this.ELEMENT_HEIGHT / 2}`;
      }
    }
  }



  compareElements = (a: ChartElement, b: ChartElement) => {
    if (!a.parent || !b.parent) {
      return 0;
    }
    if (a.parent.x < b.parent.x) {
      return 1;
    }
    if (a.parent.x > b.parent.x) {
      return 1;
    }
    if (a.x < b.x) {
      return -1;
    }
    return 1;
  }


}
