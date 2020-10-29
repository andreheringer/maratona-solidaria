import { StudentService } from './../students/students.service';
import { DonationsRepository } from './../../../core/repositories/donations.repository';
import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { DonationStateModel, DonationState } from './donations.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  ClearDonationStore,
  UpdateDonationsState,
  AppendDonationsState,
  FilterDonationState,
  ClearDonationFilter,
} from './donations.actions';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../../models/donation';
import { SimpleDonation } from '../../models/simpleDonation';
import { TeamService } from '../teams/teams.service';
import { Student } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(
    private store: Store,
    private teamService: TeamService,
    private studentService: StudentService,
    private donationsRepo: DonationsRepository
  ) {}

  private getStore() {
    return this.store.snapshot().user as DonationStateModel;
  }

  @Dispatch()
  public clearDonationsStore() {
    return new ClearDonationStore();
  }

  @Dispatch()
  private updateDonationsState(
    partialDonationStateModel: Partial<DonationStateModel>
  ) {
    return new UpdateDonationsState(partialDonationStateModel);
  }

  @Dispatch()
  private appendDonationsState(donation: Donation) {
    return new AppendDonationsState(donation);
  }

  @Dispatch()
  public filterDonationsState(teamId: number) {
    return new FilterDonationState(teamId);
  }

  @Dispatch()
  public clearDonationsFilter() {
    return new ClearDonationFilter();
  }

  @Select(DonationState.allDonations)
  public allDonations$: Observable<Donation[]>;

  @Select(DonationState.teamDonations)
  public teamDonations$: Observable<Donation[]>;

  public updateAllDonations(donations: Donation[]) {
    this.updateDonationsState({
      allDonations: donations,
      teamDonations: donations,
    });
  }

  public updateTeamDonations(donations: Donation[]) {
    this.updateDonationsState({ teamDonations: donations });
  }

  public donate(donation: SimpleDonation) {
    //post donation
    const donationObs = this.donationsRepo.createDonation(donation);
    donationObs.subscribe(
      (response) => {
        this.appendDonationsState({
          ...donation,
          id: response.donate_id,
          confirmado: false,
        });
        alert('Doação feita com sucesso!');
      },
      (error) => {
        alert('Erro ao realizar doação.');
      }
    );
  }

  public syncDonations() {
    this.donationsRepo.getDonations().subscribe((donations) => {
      let currentStudents = [];
      this.studentService.teamStudents$.subscribe(
        (students) => (currentStudents = students)
      );

      donations = donations.map((donation) => {
        return {
          id: donation.id,
          doacao: donation.doacao,
          tipo: Number.parseInt(donation.tipo),
          quantidade: donation.quantidade,
          representante: currentStudents.find(
            (student) => student.id === donation.aluno_id
          ),
          data: donation.data,
          pontuacao: donation.pontuacao,
          observacao: donation.observacao,
          confirmado: donation.confirmado,
        };
      });

      this.updateAllDonations(donations);
    });
  }

  public confirmDonation(id: number) {
    let currentDonations: Donation[];
    let currentStudents: Student[];

    this.allDonations$.subscribe((donations) => (currentDonations = donations));
    this.studentService.teamStudents$.subscribe(
      (students) => (currentStudents = students)
    );

    this.donationsRepo.confirmDonation(id).subscribe((fetchedDonation) => {
      const student = currentStudents.find(
        (student) => student.id === fetchedDonation.aluno_id
      );
      this.updateAllDonations(
        currentDonations.map((donation) =>
          donation.id === fetchedDonation.id
            ? {
                id: fetchedDonation.id,
                doacao: fetchedDonation.doacao,
                tipo: Number.parseInt(fetchedDonation.tipo),
                quantidade: fetchedDonation.quantidade,
                representante: student,
                data: fetchedDonation.data,
                pontuacao: fetchedDonation.pontuacao,
                observacao: fetchedDonation.observacao,
                confirmado: fetchedDonation.confirmado,
              }
            : donation
        )
      );
      const team_id = student.curso.id;
      let points = fetchedDonation.pontuacao;
      points = student.curso.size ? points / student.curso.size : points;

      if (!fetchedDonation.confirmado) {
        points *= -1;
      }

      this.teamService.addTeamScore(team_id, points);
    });
  }
}
