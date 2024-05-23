import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgModule,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { RepoService } from 'src/app/services/repo.service';
import { CampaignChartElement } from 'src/app/Models/_models/CampaignChartElement';
import { Point } from 'src/app/Models/_models/PointChart';
import { CampaignFlowItem } from 'src/app/Models/_models/CampaignFlowItem';
// import { CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CampaignserviceService } from '../../campaignservice.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';

import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';    // console.log('mymessage2 : ' , this.journeyType);
import { CdkDrag } from '@angular/cdk/drag-drop';
import axios from 'axios';
import { DialogConfig } from '@angular/cdk/dialog';
declare var $: any;

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-campaign-flow',
  templateUrl: './campaign-flow.component.html',
  styleUrls: ['./campaign-flow.component.scss'],
})
export class CampaignFlowComponent implements OnInit, AfterViewInit {
  hideedit = false;
  hidedelete = false;
  hideadd = false;
  countaction: any = [];
  // SaveButton: 'assets/img/button/save.svg';
  Billing = 'assets/img/sidenavicons/billing.svg';
  colors = ['#9E9E9E', '#388E3C', '#4527A0', '#EF6C00'];
  @ViewChild('chart')
  chart?: ElementRef<SVGElement>;
  id?: number;
  isDraggingGrid = false;
  gridDownClientX: number;
  gridDownClientY: number;
  scaleFactor = 1.02;
  @ViewChild('crudModal') crudModal: ElementRef;
  isDraggingNodeLayer = false;
  StoreSelectValue = false;
  draggingNodeLayer: CampaignChartElement;
  nodeLayers: CampaignChartElement[] = [];
  selectedNodeLayers: CampaignChartElement[] = [];
  // newItem: CampaignFlowItem = {event_name: 'Candidate', event_order: 1,  event_type:'',color:'#9E9E9E'};
  newItem: CampaignFlowItem = {
    event_name: 'start campaign',
    event_order: 0,
    event_type: 'start',
    event: '',
    schedule_on: '',
    for: '',
    condition: '',
    name: '',
    color: '',
    trigger_interval_unit: '',
    trigger_interval: 0,
    jump_event: '0',
    trigger_date: '',
    parent_id: 1,
  };
  selected = this.newItem;
  mySelections: string[];
  toppings = new UntypedFormControl('');
  toppings121 = new UntypedFormControl();
  categories = new UntypedFormControl();
  categories1 = new UntypedFormControl();
  botcategories = new UntypedFormControl();
  actionfor: string[] = ['Candidate', 'recruiter', 'Hiring Manager'];
  campaign_id = this.newItem;
  selectedAction: any;
  list: CampaignFlowItem[] = [];
  CampaignChartElementList: CampaignChartElement[] = [];
  WIDTH = 100;
  HEIGHT = 100;
  ELEMENT_WIDTH = 150;
  // width: number = 250;
  ELEMENT_HEIGHT = 40;
  PADDING = 10;
  zoom = 1;
  ZOOM_FACTOR = 1.2;
  dragMode = false;
  dragModeDiv = false;
  moveMode = false;
  movediv = false;
  startX = 0;
  startY = 0;
  x0 = 0;
  y0 = 0;
  x = 0;
  y = 0;
  StoreResponse: any = [];
  selectedjumptoevent = false;
  edited: true;
  viewBox = `${this.x} ${this.y} ${this.WIDTH} ${this.HEIGHT}`;
  intent: any;
  slot: any;
  actions: any;
  flowlist: any = [];
  messagetemplates: any;
  allintent: any;
  allslot: any;
  displayname: any;
  grid = true;
  isDisabled = false;
  maxselect: any = [];
  public dragging: boolean;
  decoded: any;
  ToggleButtonclick: any = [];
  selectedValueTime: string;
  selectedValueDays: string;
  emailtemplatesCampaign: any;
  messagetemplatesCampaign: any;
  bots: any;

  btnDisabled = false;
  range = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });
  registerForm: UntypedFormGroup;
  actionforevent: string;
  trigger_interval: number;
  flowdataid: any;
  showTab = 'immediate';
  TimeInterval: any;
  selectit: any;
  hideicon = true;

  allstatusload = 0;
  candidateStatus: any = [];
  campaignChannels: any = [];
  campaignChannelsData: any = [];
  temp_detail: string = 'Based On Campaign Channel';
  is_sms_templates: boolean = false;
  sms_template: any;
  is_email_templates: boolean = false;
  email_template: any;
  is_bot_data: boolean = false;
  Bot_data: any;
  temp_sec: boolean = false;
  constructor(
    private CampaignDB:CampaignserviceService,
    private route: ActivatedRoute,
    private repo: RepoService,
    public db: DbService,
    public router: Router,
    // private fb: UntypedFormBuilder,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public Dailog: DialogConfig
  ) {}

  // My Code Start

  public EmailTemplates: any[] = [];
  public SmsTemplates: any[] = [];
  public BotTemplates: any[] = [];
  public CandidateStatus: any[] = [];
  public ShowEmailTemplate = false;
  public ShowCallTemplate = false;
  public ShowSmsTemplate = false;
  public ShowChannelTemplate = false;
  public ShowMinutesDropDown = false;
  public ShowHourDropDown = false;
  public ShowDayDropDown = false;
  public ShowMonthDropDown = false;
  public ShowYearDropDown = false;
  public UpdateButton = false;
  public SaveButton = false;
  public ShowRelativeTimePeriodTemplate = false;
  channelNames: any;
  ChannelTemplate = '';
  EmailTemplates1 = '';
  EmailTemplate: string = '';
  CallTemplate: string = '';
  SmsTemplate: string = '';
  rangeForm: FormGroup;

  async fetchChannelData() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const globalData1 = await this.httpClient
        .get<any>('http://192.168.4.14:8002/fetch_channels', { headers })
        .toPromise();
      const globalData2 = await this.httpClient
        .get<any>('http://192.168.4.14:8002/sendSMS', { headers })
        .toPromise();
      const globalData3 = await this.httpClient
        .get<any>('http://192.168.4.14:8002/sendBotName', { headers })
        .toPromise();
      const globalData4 = await this.httpClient
        .get<any>('http://192.168.4.14:8002/sendEmail', { headers })
        .toPromise();
      const globalData5 = await this.httpClient
        .get<any>('http://192.168.4.14:8002/candidate_statuses', { headers })
        .toPromise();
      debugger;
      this.channelNames = globalData1;
      this.SmsTemplates = globalData2;
      this.BotTemplates = globalData3;
      this.EmailTemplates = globalData4;
      this.CandidateStatus = globalData5;
      // console.log(this.channelNames);
      // console.log(this.candidateStatus.display_name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  HandleSelectAction() {
    $('#action-model').appendTo('body').modal('show');
  }
  HandleCancelClick1() {
    this.CloseModal('#condition-model');
  }

  HandleCancelClick2() {
    console.log('hello');
    this.CloseModal('#action-model');
  }

  OnChannelChange() {
    console.log('hello');
    console.log(this.selected.channel_id);
    if (this.selected.channel_id == 2) {
      this.ShowEmailTemplate = true;
      this.ShowCallTemplate = false;
      this.ShowSmsTemplate = false;
    } else if (this.selected.channel_id == 1) {
      this.ShowCallTemplate = true;
      this.ShowEmailTemplate = false;
      this.ShowSmsTemplate = false;
    } else if (this.selected.channel_id == 3) {
      this.ShowSmsTemplate = true;
      this.ShowCallTemplate = false;
      this.ShowEmailTemplate = false;
    } else {
      this.ShowCallTemplate = false;
      this.ShowEmailTemplate = false;
      this.ShowSmsTemplate = false;
    }
  }

  HandleOnChangeInterval() {
    console.log(this.selected.trigger_interval_unit);
    if (this.selected.trigger_interval_unit === 'minute') {
      this.ShowMinutesDropDown = true;
      this.ShowHourDropDown = false;
      this.ShowDayDropDown = false;
      this.ShowMonthDropDown = false;
      this.ShowYearDropDown = false;
    } else if (this.selected.trigger_interval_unit === 'hour') {
      this.ShowMinutesDropDown = false;
      this.ShowHourDropDown = true;
      this.ShowDayDropDown = false;
      this.ShowMonthDropDown = false;
      this.ShowYearDropDown = false;
    } else if (this.selected.trigger_interval_unit === 'day') {
      this.ShowMinutesDropDown = false;
      this.ShowHourDropDown = false;
      this.ShowDayDropDown = true;
      this.ShowMonthDropDown = false;
      this.ShowYearDropDown = false;
    } else if (this.selected.trigger_interval_unit === 'month') {
      this.ShowMinutesDropDown = false;
      this.ShowHourDropDown = false;
      this.ShowDayDropDown = false;
      this.ShowMonthDropDown = true;
      this.ShowYearDropDown = false;
    } else if (this.selected.trigger_interval_unit === 'year') {
      this.ShowMinutesDropDown = false;
      this.ShowHourDropDown = false;
      this.ShowDayDropDown = false;
      this.ShowMonthDropDown = false;
      this.ShowYearDropDown = true;
    } else {
      this.ShowMinutesDropDown = false;
      this.ShowHourDropDown = false;
      this.ShowDayDropDown = false;
      this.ShowMonthDropDown = false;
      this.ShowYearDropDown = false;
    }
  }

  // UpdateConditionFlow1(demo1: string, demo2: number, event: any): void {
  //   debugger;
  //   console.log(
  //     'event name:',
  //     demo1,
  //     'event order:',
  //     demo2,
  //     'input value:',
  //     event.target.value
  //   );
  //   const inputElement =
  //     document.querySelector<HTMLInputElement>('#event_nameID');
  //   if (inputElement) {
  //     debugger;
  //     console.log(inputElement.value);
  //     inputElement.value = this.selected.event_name;
  //   } else {
  //     debugger;
  //     console.error('Input element not found');
  //   }

  //   $('#AddEventRounds').appendTo('body').modal('hide');
  //   $('#modalopen').appendTo('body').modal('show');
  //   this.CloseModal('#event-model');
  //   this.CloseModal('#condition-model');
  // }

  // @ViewChild('mytemp') mytemp: TemplateRef<any>;
  openDialog(templateRef: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(templateRef);

    // Subscribe to the afterClosed event if you need to handle the dialog close event
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
    });
  }

  // My Code End

  setChartSize() {
    if (this.chart) {
      this.WIDTH = this.chart.nativeElement.clientWidth;
      this.HEIGHT = this.chart.nativeElement.clientHeight;
      this.setViewBox();

      this.CampaignChartElementList = this.setCampaignChartElementList(
        this.list
      );

      this.CampaignChartElementList;
    }
  }

  saveflow() {
    this.CampaignChartElementList;
  }

  tabToggle(index:any) {
    debugger;
    if (index == 'immediate') {
      this.trigger_interval = 0;
      this.selected.trigger_interval = null;
      this.selected.trigger_interval_unit = null;
      this.selected.trigger_date = null;
      this.selected.trigger_mode = 'immediate';
    } else if (index == 'interval') {
      this.selected.trigger_date = null;
      this.selected.trigger_mode = 'interval';
      // this.ShowRelativeTimePeriodTemplate=true
    } else if (index == 'date') {
      this.selected.trigger_interval = null;
      this.selected.trigger_interval_unit = null;
      this.selected.trigger_mode = 'date';
    }
    this.showTab = index;
  }

  ngAfterViewInit() {
    window.setTimeout(() => this.setChartSize());
  }

  @HostListener('window:resize')
  onResize() {
    this.setChartSize();
  }

  setViewBox() {
    this.viewBox =
      `${this.x * this.zoom} ` +
      `${this.y * this.zoom} ` +
      `${this.WIDTH * this.zoom} ` +
      `${this.HEIGHT * this.zoom}`;
  }

  DragableandMoveable() {
    this.viewBox =
      `${this.x * this.zoom} ` +
      `${this.y * this.zoom} ` +
      `${this.WIDTH * this.zoom} ` +
      `${this.HEIGHT * this.zoom}`;
  }

  onPan() {
    this.dragMode = !this.dragMode;
  }
  onPan1() {
    this.dragModeDiv = !this.dragModeDiv;
  }
  onZoomIn() {
    this.zoom /= this.ZOOM_FACTOR;
    this.setViewBox();
  }

  onZoomOut() {
    this.zoom *= this.ZOOM_FACTOR;
    this.setViewBox();
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
      const viewBoxList = (this.viewBox =
        `${this.x * this.zoom} ` +
        `${this.y * this.zoom} ` +
        `${this.WIDTH * this.zoom} ` +
        `${this.HEIGHT * this.zoom}`);

      const aspX = parseInt(viewBoxList[4], 10) / 500;
      const aspY = parseInt(viewBoxList[3], 10) / 500;

      // move NodeLayer
      if (pointerEvent.offsetX) {
        // Math.floor((Math.random()*500)+1);
        this.draggingNodeLayer.x = this.round(pointerEvent.offsetX);

        this.draggingNodeLayer.y = this.round(pointerEvent.offsetY);
      } else {
        const { left, top } = (
          pointerEvent.srcElement as Element
        ).getBoundingClientRect();
        this.draggingNodeLayer.x =
          pointerEvent.clientX - left + parseInt(viewBoxList[0], 10);
        this.draggingNodeLayer.y =
          pointerEvent.clientY - top + parseInt(viewBoxList[1], 10);
      }
    }
  }
  round(v) {
    return Math.round(v / 10) * 10;
  }

  modalclose() {
    $('#modalopen').hide();
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
  //
  // this.selectit=

  isEnableDesableBot(opt: any, selected: any): boolean {
    return (
      this.botcategories.value?.length >= selected &&
      !this.botcategories.value?.find((el) => el == opt)
    );
  }
  isOptionDisabled(opt: any, selected: any, template): boolean {
    return (
      this.categories.value?.length >= selected &&
      !this.categories.value?.find((el) => el == opt)
    );
  }

  isOptionDisabledemailtemplate(opt: any, selected: any): boolean {
    return (this.StoreSelectValue =
      this.categories1.value?.length >= selected &&
      !this.categories1.value.find((el) => el == opt));
  }

  // this.mySelections=
  changed12() {
    if (this.categories1.value.length < 3) {
      this.mySelections = this.toppings.value;
    } else {
      this.toppings.setValue(this.mySelections);
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

  ngOnInit(): void {
    this.rangeForm = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
    this.fetchChannelData();
    $('app-footer').hide();

    this.route.paramMap.subscribe((paramMap) => {
      this.flowdataid = paramMap.get('id');
      debugger;
      if (this.flowdataid) {
        this.decoded = window.atob(this.flowdataid);
        this.id = Number(this.decoded);
      }

      this.getList();

      // this.getmessagetemplate();
    });
  }

  getIntentFlow(): void {
    this.CampaignDB.list('intentflow/', { bot_id: this.id }, (response): void => {
      this.allintent = response;
    });
  }

  getSlot(): void {
    this.CampaignDB.list('slotflow/', { bot_id: this.id }, (response): void => {
      this.allslot = response;
    });
  }

  getmessagetemplate(): void {
    this.CampaignDB.list('getemailtemplatecampaign/', null, (response): void => {
      this.emailtemplatesCampaign = response;
    });

    this.CampaignDB.list('getmessagetemplatecampaign/', null, (response): void => {
      this.messagetemplatesCampaign = response;
    });

    this.CampaignDB.list('getbots/', null, (response): void => {
      this.bots = response;
    });
  }

  togglebutton(data) {
    this.ToggleButtonclick = data;
    // this.currDiv = data;
    if (data == 'Delayed') {
      $('.showDays').show();
      $('.showTime').show();
    } else {
      $('.showDays').hide();
      $('.showTime').hide();
    }
  }
  onClickAction(data) {
    if (data == 'call') {
      // $('#hidemessagetemplate').appendTo('body').modal('show');

      $('#hidemessagetemplate').hide();
    }
  }
  changed(SMS_template_id) {
    SMS_template_id.forEach((v) => {
      v.isDisabled = !v.isDisabled;
      // if (v.show)  {

      // this.isDisabled
      //   v['disabled'] = !v['disabled'];
      // }
      // }
    });
  }

  AddEvent(item: CampaignFlowItem) {
    this.UpdateButton = false;
    this.SaveButton = true;
    this.selected = item;
    $('#event-model').appendTo('body').modal('show');
  }
  mousein() {
    this.hideedit = this.hideedit;
    this.hidedelete = this.hidedelete;
    this.hideadd = this.hideadd;
  }
  mouseover(nodeLayer: CampaignChartElement) {
    nodeLayer.isSelected = true;
    // this.selectedNodeLayers.push(nodeLayer);
    this.hideedit = !this.hideedit;
    this.hidedelete = !this.hidedelete;
    this.hideadd = !this.hideadd;
  }

  jumpnode(item: CampaignFlowItem) {
    if (item.id) {
      this.StoreResponse = item.temp_id;
      this.selected = item;
    }
  }

  // nodeLayer: CampaignChartElement

  setCampaignChartElementList(
    list : CampaignFlowItem[]
  ): CampaignChartElement[] {
    debugger;
    const result: CampaignChartElement[] = [];
    const x = this.WIDTH / 2;
    const y = this.ELEMENT_HEIGHT;
    const campaign_id: CampaignChartElement = {
      item: this.campaign_id,
      x,
      y,
      childrenCount: 0,
      category: 0,
      isSelected: false,
      shadowFilter: 'url(#shadow)',
    };
    debugger;
    result.push(campaign_id);
    this.setChildren(result, campaign_id, list);
    this.shiftChartElements(result);
    this.setConnections(result);
    return result;
  }

  clickHandleNodeLayer(nodeLayer: CampaignChartElement) {
    // alert("clickHandleNodeLayer")
    nodeLayer.isSelected = true;
    this.selectedNodeLayers.push(nodeLayer);
    this.setConnections(this.selectedNodeLayers);
    localStorage.setItem(
      'NodeInformation',
      JSON.stringify(this.selectedNodeLayers)
    );
    const retrievedObject = localStorage.getItem('NodeInformation');
  }

  downHandleNodeLayer(
    pointerEvent: PointerEvent,
    nodeLayer: CampaignChartElement
  ) {
    this.isDraggingGrid = false;
    this.isDraggingNodeLayer = true;
    this.draggingNodeLayer = nodeLayer;
    pointerEvent.preventDefault();
  }

  setChildren(
    result: CampaignChartElement[],
    parent_id: CampaignChartElement,
    list: CampaignFlowItem[]
  ) {
    const children = list.filter(
      (item) => item.parent_id === parent_id.item.id
    );
    this.selectedNodeLayers = [];
    parent_id.childrenCount = children.length;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const offset =
        parent_id.x -
        ((children.length - 1) / 2) * (this.ELEMENT_WIDTH + this.PADDING * 2);
      const length = child.event_name?.length;
      const element = {
        x: offset + (this.ELEMENT_WIDTH + this.PADDING * 2) * i,
        y: parent_id.y + this.ELEMENT_HEIGHT * 2,
        width: this.ELEMENT_WIDTH + length * 6,
        item: child,
        parent_id,
        category: parent_id.category || i + 1,
        childrenCount: 0,
        isSelected: false,
        shadowFilter: 'url(#shadow)',
      };
      // console.log(element.width);
      result.push(element);
      this.setChildren(result, element, list);
    }
  }

  enable(id, a, b) {
    if (a <= b) {
      this.isDisabled = !this.isDisabled;
      if (this.isDisabled == true) {
      }
    }
  }

  disabele(a, b, id) {
    if (a <= b) {
      this.isDisabled = !this.isDisabled;
    }
    return this.isDisabled;
  }

  // parent_id
  // Set Chart box padding--->
  shiftChartElements(list: CampaignChartElement[]): void {
    let eventOrder = 1;
    while (true) {
      let offset = 0;
      const elementsToShift = list.filter(
        (e) => e.item.event_order === eventOrder
      );
      if (!elementsToShift.length) {
        break;
      }
      elementsToShift.sort(this.compareElements);
      for (let i = 0; i < elementsToShift.length - 1; i++) {
        const currentElement = elementsToShift[i];
        const nextElement = elementsToShift[i + 1];
        const space =
          nextElement.x -
          this.ELEMENT_WIDTH -
          5 * this.PADDING -
          currentElement.x;
        if (space < 0) {
          nextElement.x -= space;
          list
            .filter((e) => e.parent_id === currentElement)
            .forEach((child) => (child.x -= space));
          offset = Math.max(-space, offset);
        }
      }
      list
        .filter((e) => e.item.event_order >= eventOrder)
        .forEach((e) => (e.x -= offset / 2));
      eventOrder++;
    }
  }

  setConnections(list: CampaignChartElement[]): void {
    for (const element of list) {
      if (element.parent_id && element.item.event_order) {
        element.connection =
          `M ${element.x + 10} ${element.y - this.ELEMENT_HEIGHT / 2} ` +
          `C ${element.x + 10} ${element.y - this.ELEMENT_HEIGHT}, ` +
          `${element.parent_id.x + 11} ${
            element.parent_id.y + this.ELEMENT_HEIGHT
          }, ` +
          `${element.parent_id.x + 11} ${
            element.parent_id.y + this.ELEMENT_HEIGHT / 2
          }`;
      }
    }
  }

  compareElements = (
    a: CampaignChartElement,
    b: CampaignChartElement
  ): number => {
    if (!a.parent_id || !b.parent_id) {
      return 0;
    }
    if (a.parent_id.x < b.parent_id.x) {
      return -1;
    }
    if (a.parent_id.x > b.parent_id.x) {
      return 1;
    }
    if (a.x < b.x) {
      return -1;
    }
    return 1;
  };

  getList(): void {
    this.decoded;
    if (this.decoded) {
      this.CampaignDB.list('campaign/flow/', { id: this.decoded }, (response): void => {
        if (!response) {
          alert('working');
        }
        debugger;
        response.forEach((element) => {
          if (element.parent_id == 0 || element.parent_id == null) {
            element.parent_id = undefined;
          }
          if (element.jump_event) {
            element.jump_event = Number(element.jump_event);
          }

          this.selected.event_type;
          if (element.event_type == null || element.event_type == undefined) {
            this.hideicon = !this.hideicon;
          }
          if (element.for) {
            element.for = element.for.toString().split(',');
          }

          if (element.channel_id) {
            element.channel_id = Number(element.channel_id);
          }

          if (element.candidate_status_id) {
            element.candidate_status_id = Number(element.candidate_status_id);
          }
          if (element.temp_id) {
            element.temp_id = Number(element.temp_id);
          }
        });

        this.flowlist = response;
        this.list = this.flowlist;
        debugger;
        this.CampaignChartElementList = this.setCampaignChartElementList(
          this.list
        );
      });
    }
  }

  onClick(
    item: CampaignFlowItem,
    templateRefA: TemplateRef<any>,
    templateRefC: TemplateRef<any>
  ) {
    this.selected = item;
    console.log('length : ',this.selected.event_name.length);
    this.UpdateButton = true;
    this.SaveButton = false;

    if (this.selected.event_type == 'condition') {
      this.openDialog(templateRefC);
      this.getCandidateStatus();
      $('#condition-model').appendTo('body').modal('show');
    } else if (this.selected.event_type == 'action') {
      console.log('you clicked action');
      this.openDialog(templateRefA);
      this.tabToggle(this.selected.trigger_mode);
      this.getcampaignChannels();
      if (this.selected.channel_id) {
        this.getChannelDetail();
      }

      $('#action-model').appendTo('body').modal('show');
    }
  }

  getCandidateStatus(): void {
    this.allstatusload = 1;
    this.CampaignDB.list(
      'candidate-status/relations/' + 0,
      { allstatus: this.allstatusload },
      (response): void => {
        this.candidateStatus = response;
      }
    );
  }

  getcampaignChannels(): void {
    this.allstatusload = 1;
    this.CampaignDB.list('fetch_channels', null, (response): void => {
      debugger;
      this.campaignChannels = response;
    });
  }

  getFlowType(): void {
    let apiPath: string;
    let filter: any = null;
    switch (this.selected.flow_type) {
      case 'Fresh':
        this.temp_sec = false;
        break;
      case 'Flow-up':
        this.temp_sec = true;
        this.temp_detail = 'Select Call Action:';
        apiPath = 'campaign/get-call/'; // Find Email template
        filter = { campaign_id: this.selected.campaign_id };
        break;
        if (apiPath) {
          // Send request to send
          this.CampaignDB.list(apiPath, filter, (response): void => {
            this.campaignChannelsData = response;
          });
        }
    }
  }
  getChannelDetail(): void {
    this.selected.channel_id;
    const Foundchannel = this.campaignChannels.find(
      (item) => item.id === this.selected.channel_id
    );
    const channelName = Foundchannel.channel_root_name;
    let apiPath: string;
    let filter: any = null;

    switch (channelName) {
      case 'call':
        this.call_bots();
        break;
      case 'email':
        this.emailtemplate();
        break;
      case 'sms':
        this.smstemplate();
        break;
      case 'emailsms':
        this.smstemplate();
        this.emailtemplate();
        break;
      case 'whatsapp':
        this.temp_detail = 'Select Whatsapp Templates:';
        apiPath = 'whatsapp/get-whatsapp-templates/'; // Find Email template
        filter = null;
        break;
      case 'JumpToEvent':
        this.temp_detail = 'Select Campaign Event:';
        apiPath = 'campaign/flow/'; // Find Email template
        filter = { id: this.decoded };
        break;
      case 'ChangeCampaign':
        this.temp_detail = 'Select Campaign:';
        apiPath = 'campaign/campaign/'; // Find Email template
        filter = null;
        break;
      case 'latercall':
        this.temp_detail = 'Select Call Action:';
        apiPath = 'campaign/get-call/'; // Find Email template
        filter = { campaign_id: this.selected.campaign_id };
        break;
      case 'flowupcall':
        this.temp_detail = 'Select Call Action:';
        apiPath = 'campaign/get-call/'; // Find Email template
        filter = { campaign_id: this.selected.campaign_id };
        break;
      // Add more cases for other channels
      default:
        // Handle unsupported channels or provide a default API endpoint
        break;
    }
    if (apiPath) {
      // Send request to send
      this.db.list(apiPath, filter, (response): void => {
        this.campaignChannelsData = response;
      });
    }
  }

  smstemplate(): void {
    let apiPath = 'sms/sms-templates/'; // Find Email template
    let filter = null;
    this.is_sms_templates = true;
    this.CampaignDB.list(apiPath, filter, (response): void => {
      this.sms_template = response;
    });
  }

  emailtemplate(): void {
    let apiPath = 'email/email-templates/'; // Find Email template
    let filter = null;
    this.is_email_templates = true;
    this.CampaignDB.list(apiPath, filter, (response): void => {
      this.email_template = response;
    });
  }

  call_bots(): void {
    debugger;
    let apiPath = 'bot/bot-details/'; // Find Email template
    let filter = null;
    this.is_bot_data = true;
    this.CampaignDB.list(apiPath, filter, (response): void => {
      this.Bot_data = response;
    });
  }

  AddnewEvent(eventtype, color): void {
    this.selected;
    const event = {
      event_name: '',
      event_type: eventtype,
      parent_id: this.selected.id,
      campaign_id: this.decoded,
      event_order: this.selected.event_order + 1,
      color: color,
    };
    this.selected = event;
    // this.getList();
    if (this.selected.event_type == 'condition') {
      this.getCandidateStatus();
      $('#condition-model').appendTo('body').modal('show');
    } else if (this.selected.event_type == 'action') {
      this.getcampaignChannels();
      $('#action-model').appendTo('body').modal('show');
    }

    $('#event-model').appendTo('body').modal('hide');
  }
  save(): void {}
  onDelete(data:any) {
    if (data) {
      if (confirm('Do you want to delete it permanently')) {
        this.CampaignDB.destroy('campaign/flow/', data, (response): void => {
          this.getList();
          $('#modalopen').appendTo('body').modal('hide');
        });
      } else {
      }
    }
  }

  buildFormData(formData: any, data: any, parentKey?: any) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      let value = data == null ? '' : data;
      if (typeof data === 'string') {
        if (value.indexOf('{') === -1) {
          value = value.replace(/['"]+/g, '');
        }
      }
      formData.append(parentKey, value);
    }
  }

  SaveConditionFlow(): void {
    // const { campaign_id, channel_id, email_template_id, ...rest } =
    //   this.selected;

    // const parsedData = {
    //   ...rest,
    //   campaign_id: parseInt(campaign_id.toString(), 10),
    //   channel_id: parseInt(channel_id.toString(), 10),
    //   email_template_id: parseInt(email_template_id.toString(), 10),
    // };

    // const formData = new FormData();

    // Object.keys(parsedData).forEach((key) => {
    //   formData.append(key, parsedData[key].toString());
    //   console.log(typeof(formData[key]));
    // });

    // const apiUrl = 'http://192.168.3.117:8000/save_campaign_event';

    // axios
    //   .post(apiUrl, formData)
    //   .then((response) => {
    //     // Handle the response
    //     this.selected = response.data;

    //     if (this.selected.event_type === 'condition') {
    //       this.CloseModal('#condition-model');
    //     } else if (this.selected.event_type === 'action') {
    //       this.CloseModal('#action-model');
    //     }

    //     this.getList();
    //     $('#AddEventRounds').appendTo('body').modal('hide');
    //     $('#modalopen').appendTo('body').modal('show');
    //     this.CloseModal('#event-model');
    //     this.CloseModal('#condition-model');

    //     // Additional actions based on your requirements
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error('Error making POST request:', error);
    //   });

    this.CampaignDB.store(
      'save_campaign_event',
      // 'campaign/flow/',
      this.selected,
      (response): void => {
        this.selected = response;
        if (this.selected.event_type == 'condition') {
          this.CloseModal('#condition-model');
        } else if (this.selected.event_type == 'action') {
          this.CloseModal('#action-model');
        }
        this.getList();
        // $('#AddEventRounds').appendTo('body').modal('hide');
        // $('#modalopen').appendTo('body').modal('show');
        // this.CloseModal('#event-model');
        // this.CloseModal('#condition-model');
      }
    );
  }

  UpdateConditionFlow(): void {
    console.log('Details : ', this.selected);
    debugger;
    this.CampaignDB.update(
      'campaign/flow/',
      this.selected.id,
      this.selected,
      (response): void => {
        this.selected = response;
        if (this.selected.event_type == 'condition') {
          this.CloseModal('#condition-model');
        } else if (this.selected.event_type == 'action') {
          this.CloseModal('#action-model');
        }
        this.getList();
      }
    );
  }

  CloseModal(modelname) {
    $(modelname).appendTo('body').modal('hide');
  }

  // like a service

  getChannelNameById(channelId: number): string {
    const selectedChannel = this.campaignChannels.find(
      (channel) => channel.id === channelId
    );
    return selectedChannel ? selectedChannel.channel_name : '';
  }
}

// @NgModule({
//   declarations: [
//     CampaignFlowComponent, // Include your component in the declarations array
//     // Other components...
//   ],
//   imports: [
//     MatDialogModule, // Include MatDialogModule
//     FormsModule,
//     ReactiveFormsModule,
//     // Other modules...
//   ],
// })
// export class YourModule { }
